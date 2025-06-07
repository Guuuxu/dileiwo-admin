<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer,useVbenModal } from '@vben/common-ui';

import { ElButton, ElCard, ElMessage, ElTag, ElForm,
  ElFormItem,
  ElInput, } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { $t } from '#/locales';
import { downloadBlob } from '#/utils';
import { getOutboundList, deleteDelivery, downloadExportedFile } from '#/api';
import Edit from './edit.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
});

const router = useRouter();

// 表格配置
interface RowType {
  id: number;
  created_at: string;
  category: string;
  during: string;
  times: string;
  remark: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { field: 'order_no', title: '型号' },
    { field: 'amount', title: '数量' },
    // { field: 'month_limit', title: '每月数量' },
    { field: 'during', title: '租赁天数' },
    { field: 'created_at', title: '出货日期' },
    { field: 'remark', title: '备注' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 150,
    },
  ],
  data: dataList.value,
  height: 'auto',
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getOutboundList({
          page: page.currentPage,
          per_page: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      fieldName: 'client',
      label: '客户',
    },
    // {
    //   component: 'Input',
    //   fieldName: 'customer',
    //   label: '出库单号',
    // },
    {
      component: 'Select',
      fieldName: 'type_name',
      label: '出货类型',
      componentProps: {
        options: [
          { label: '租赁', value: '1' },
          { label: '购买', value: '2' },
        ],
      },
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

// 新增
const handleAdd = () => {
  handleSetData({}, '新增');
};
// 编辑
function handleEditRow(row: RowType) {
  ElMessage.warning('功能待开发！');
}

const handleSetData = (row: RowType, title: string) => {
  drawerApi
    .setData({
      values: { ...row },
    })
    .setState({
      title,
    })
    .open();
};

import { ElMessageBox } from 'element-plus';
const handleDeleteRow = (row: RowType) => {
  ElMessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteDelivery(row.id).then((res) => {
        ElMessage.success('删除成功');
        gridApi.query();
      });
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};

// 导出 填写表单邮箱
const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    formData.value.email = '';
    FormRef.value?.clearValidate();
    modalApi.close();
  },
  // 关闭动画播放完毕时触发
  onClosed() {
    formData.value.email = '';
    FormRef.value?.clearValidate();
    modalApi.close();
  },
  onConfirm: async () => {
    FormRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true;
        downloadExportedFile(currentRow.value.id,formData.value.email).then((res) => {
          console.log(res);
          // downloadBlob(res.data, '包装库存.xlsx');
          loading.value = false;

          ElMessage.success('提交成功');
          modalApi.close();
        });
      }
    });
  },
  title: '导出',
});
const FormRef = ref<FormInstance>();
const formData = ref({
  email: '',
});
const rules = ref<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
});
const loading = ref(false);
const currentRow = ref<RowType>({} as RowType);
const handleExport = async (row: RowType) => {
  currentRow.value = row;
  modalApi.open();
};
const handleImport = () => {
  ElMessage.warning('功能待开发！');
};
const handleUpdate = () => {
  gridApi.reload();
};
</script>
<template>
  <Page auto-content-height :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton>
      <ElButton type="primary" @click="handleImport()"> 导入 </ElButton>
    </template>
    <Grid>
      <template #status="{ row }">
        <ElTag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '已启用' : '已禁用' }}
        </ElTag>
      </template>
      <template #action="{ row }">
        <ElButton type="primary" link @click="handleExport(row)">
          导出
        </ElButton>
        <ElButton type="danger" link @click="handleDeleteRow(row)">
          删除
        </ElButton>
      </template>
    </Grid>

    <Drawer @onUpdated="handleUpdate" />
    <Modal>
      <template #default>
        <el-form
          ref="FormRef"
          :model="formData"
          :rules="rules"
          label-width="100px"
          :inline="true"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" />
          </el-form-item>
        </el-form>
      </template>
    </Modal>
  </Page>
</template>
