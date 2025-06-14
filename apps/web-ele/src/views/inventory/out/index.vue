<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElMessage,
  ElMessageBox,
  ElForm,
  ElFormItem,
  ElInput,
} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { $t } from '#/locales';
import { downloadBlob } from '#/utils';
import { getInventoryOutList, exportInventoryOut } from '#/api';

import Edit from './edit.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: Edit,
});

const router = useRouter();

// 表格配置
interface RowType {
  id: number;
  created_at: string;
  package: string;
  customer: string;
  contact: string;
  address: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    // { field: 'category', title: '型号' },
    { field: 'order_no', title: '包装' },
    { field: 'created_at', title: '出货日期' },
    { field: 'name', title: '出货客户' },
    { field: 'link_person', title: '联络人' },
    { field: 'receive_address', title: '地址' },
    { field: 'status', title: '类型', slots: { default: 'status' } },
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
        return await getInventoryOutList({
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
    {
      component: 'Select',
      fieldName: 'type_name',
      label: '类型',
      componentProps: {
        clearable: true,
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
// 明细
function handleViewRow(row: RowType) {
  handleSetData(row, '明细');
}

// 导出 填写表单邮箱
const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    formData.value.email = '';
    modalApi.close();
    FormRef.value?.clearValidate();
  },
  // 关闭动画播放完毕时触发
  onClosed() {
    // emit('update:modelValue', {});
    formData.value.email = '';
    FormRef.value?.clearValidate();
    modalApi.close();
  },
  onConfirm: async () => {
    FormRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true;
        exportInventoryOut(currentRow.value.id, formData.value.email).then(
          (res) => {
            console.log(res);
            // downloadBlob(res.data, '包装库存.xlsx');
            loading.value = false;

            ElMessage.success('提交成功');
            modalApi.close();
          },
        );
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
async function handleExportRow(row: RowType) {
  currentRow.value = row;
  modalApi.open();
  // const res = await exportInventoryOut(row.id);
  // downloadBlob(res.data, '出库单库存.xlsx');
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
const handleDeleteRow = (row: RowType) => {
  ElMessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // Perform delete operation here
      // const index = dataList.value.findIndex((item: { id: number; }) => item.id === row.id);
      // if (index !== -1) {
      //   dataList.value.splice(index, 1);
      //   ElMessage.success('删除成功');
      // }
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
</script>
<template>
  <Page auto-content-height :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <!-- <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton> -->
      <!-- <ElButton type="primary" @click="handleToDetail()"> 导入 </ElButton> -->
    </template>
    <Grid>
      <template #status="{ row }">
        <span v-if="row.type == 1">租赁</span>
        <span v-else>购买</span>
      </template>
      <template #action="{ row }">
        <ElButton type="primary" link @click="handleViewRow(row)">
          明细
        </ElButton>
        <ElButton type="primary" link @click="handleExportRow(row)">
          导出
        </ElButton>
      </template>
    </Grid>

    <Drawer />
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
