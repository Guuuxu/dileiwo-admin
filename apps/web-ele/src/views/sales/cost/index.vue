<template>
  <Page :title="$t(router.currentRoute.value.meta.title)">
    <template #extra>
      <ElButton type="primary" @click="handleAdd()"> 新增 </ElButton>
      <ElButton type="primary" @click="handleImport()"> 导入 </ElButton>
    </template>
    <ElCard>
      <template #default>
        <Form>
          <template #reset-before>
            <ElButton type="primary" @click="handleSearch">搜索</ElButton>
          </template>
          <template #submit-before>
            <ElButton @click="handleReset">清空</ElButton>
          </template>
        </Form>
        <div class="vp-raw h-[500px] w-full">
          <Grid>
            <template #status="{ row }">
              <el-tag :type="row.status ? 'success' : 'danger'">{{
                row.status ? '已启用' : '未启用'
              }}</el-tag>
            </template>
            <template #action="{ row }">
              <ElButton type="primary" link @click="editRowEvent(row)"
                >编辑</ElButton
              >
              <ElButton type="primary" link @click="editRowEvent(row)"
                >明细</ElButton
              >
            </template>
          </Grid>
        </div>
      </template>
    </ElCard>
    <FormModal :type="type" :modelValue="currentRow" />
  </Page>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import EditModal from './edit-modal.vue';
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: EditModal,
  closeOnClickModal: false,
});
// const loading = ref(false);
// const [Modal, modalApi] = useVbenModal({
//   draggable: true,
//   confirmLoading: loading.value,
//   onConfirm() {
//     modalApi.setState({ confirmLoading: true });
//     setTimeout(() => {
//       modalApi.setState({ confirmLoading: false });
//       ElMessage.success('新增成功！');
//       modalApi.close();
//     }, 1000);
//   },
// });

import {
  ElButton,
  ElCard,
  ElLink,
  ElMessage,
  ElPagination,
  ElTable,
  ElTag,
} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const router = useRouter();
const [Form, formApi] = useVbenForm({
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  resetButtonOptions: { show: false },
  submitButtonOptions: { show: false },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  handleSubmit: (values) => {
    ElMessage.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'contractNo',
      label: '合同号',
    },

    {
      component: 'Input',
      fieldName: 'name',
      label: '合同名称',
    },
    {
      component: 'Input',
      fieldName: 'customer',
      label: '客户名称',
    },
  ],
});

function handleSearch() {
  formApi.getValues();
}
function handleReset() {
  formApi.resetForm();
}

// 表格配置
interface RowType {
  id: number;
  creatTime: string;
  contractNo: string;
  code: string;
  name: string;
  customer: string;
  amount: string;
  quantity: string;
  unit: string;
  deliveryDate: string;
  price: string;
  remark: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { align: 'left', title: '', type: 'checkbox', width: 40 },
    { type: 'seq', width: 60 },
    { editRender: { name: 'input' }, field: 'contractNo', title: '合同号' },
    { editRender: { name: 'input' }, field: 'name', title: '合同名称' },
    { editRender: { name: 'input' }, field: 'customer', title: '客户名称' },

    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  data: dataList.value,
  height: 'auto',
  scrollY: {
    enabled: true,
    gt: 0,
  },
  showOverflow: true,
  pagerConfig: {},
  // proxyConfig: {
  //   ajax: {
  //     query: async ({ page }) => {
  //       return await getExampleTableApi({
  //         page: page.currentPage,
  //         per_page: page.pageSize,
  //       });
  //     },
  //   },
  // },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

// 模拟行数据
const loadList = (size = 200) => {
  try {
    // const dataList: RowType[] = [];
    for (let i = 0; i < size; i++) {
      dataList.value.push({
        id: 10_000 + i,
        createTime: '2025-1-3',
        name: `消防排风${i}`,
        contractNo: `h000-${i}`,
        code: `000-${i}`,
        unit: '个',
        customer: '张三',
        amount: 5 * (1 + i),
        quantity: 1 + i,
        deliveryDate: '2025-02-28',
        price: '5',
        remark: '备注一下',
        status: 0,
      });
    }
    // gridApi.setGridOptions({ data: dataList });
  } catch (error) {
    console.error('Failed to load data:', error);
    // Implement user-friendly error handling
  }
};

const type = ref('add');
const currentRow = ref({});
// 新增
const handleAdd = () => {
  type.value = 'add';
  currentRow.value = {};
  formModalApi.open();
};

const handleImport = () => {};
const editRowEvent = (row: RowType) => {
  type.value = 'edit';
  currentRow.value = row;
  nextTick(() => {
    formModalApi.open();
  });
};

onMounted(() => {
  loadList(30);
});
</script>
