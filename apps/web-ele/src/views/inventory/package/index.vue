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
import { getInventoryList, exportInventory } from '#/api';
import { downloadBlob } from '#/utils';
import { inventoryUseType } from '#/views/dict';

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
// 获取路由参数中的 type_name
const routeTypeName = router.currentRoute.value.query.type_name as string;
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    // { align: 'left', title: '', type: 'checkbox', width: 40 },
    { field: 'type_name', title: '型号', width: 150 },
    { field: 'detail_no', title: '包装编码', width: 150 },
    { field: 'month_limit', title: '总循环次数' },
    { field: 'limit_count', title: '单月已用' },
    { field: 'remain_count', title: '单月剩余用量' },
    {
      field: 'status',
      title: '状态',
      cellRender: {
        name: 'CellSelectLabel',
        props: {
          options: inventoryUseType,
        },
      },
    },
    { field: 'last_use', title: '最后使⽤⽇' },
    { field: 'name', title: '客户' },
    { field: 'receive_address', title: '收件人地址' },
    // {
    //   field: 'action',
    //   fixed: 'right',
    //   slots: { default: 'action' },
    //   title: '操作',
    //   width: 150,
    // },
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
        return await getInventoryList({
          page: page.currentPage,
          per_page: page.pageSize,
          ...formValues,
          type_name: routeTypeName || formValues.type_name,
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
      fieldName: 'type_name',
      label: '型号',
      defaultValue: routeTypeName || '', // 在单个字段上设置默认值
    },
    {
      component: 'Input',
      fieldName: 'detail_no',
      label: '包装编码',
    },
    {
      component: 'Input',
      fieldName: 'client',
      label: '客户',
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '状态',
      componentProps: {
        clearable: true,
        options: inventoryUseType,
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
        exportInventory(formData.value.email).then((res) => {
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
async function handleExportRow() {
  modalApi.open();
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
      <ElButton type="primary" @click="handleExportRow()" :loading="loading">
        导出
      </ElButton>
      <!-- <ElButton type="primary" @click="handleToDetail()"> 导入 </ElButton> -->
    </template>
    <Grid> </Grid>

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
