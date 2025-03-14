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
              <template v-if="hasEditStatus(row)">
                <ElButton type="primary" link @click="saveRowEvent(row)"
                  >保存</ElButton
                >
                <ElButton type="info" link @click="cancelRowEvent(row)"
                  >取消</ElButton
                >
              </template>
              <template v-else>
                <ElButton type="primary" link @click="editRowEvent(row)"
                  >编辑</ElButton
                >
              </template>
            </template>
          </Grid>
        </div>
      </template>
    </ElCard>
    <Modal ref="dataTable" class="w-[600px]" title="新增"> </Modal>
    <FormModal />
  </Page>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
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
// 新增
const handleAdd = () => {
  formModalApi.open();
};

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
      fieldName: 'type',
      label: '类别',
    },
    {
      component: 'Input',
      fieldName: 'type',
      label: '名称',
    },
  ],
});

const handleImport = () => {
  console.log('handleImport');
};
function handleSearch() {
  formApi.getValues();
}
function handleReset() {
  formApi.resetForm();
}

// 表格配置
interface RowType {
  id: number;
  createTime: string;
  contractNo: string;
  code: string;
  name: string;
  customer: string;
  amount: string;
  signatory: string;
  unit: string;
  deliveryDate: string;
  dueDate: string;
  remark: string;
}
const dataList: any = ref([]);
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { type: 'seq', width: 60 },
    { field: 'createTime', title: '物料编号' },
    { field: 'category', title: '类别' },
    { field: 'name', title: '名称' },
    { field: 'customer', title: '规格型号' },
    { field: 'amount', title: '本地物料代号' },
    { field: 'unit', title: '单位' },
    { field: 'price', title: '单价' },
    { field: 'weight', title: '重量' },
    { field: 'signatory', title: '体积' },
    { field: 'remark', title: '备注' },
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
  // proxyConfig: {
  //   ajax: {
  //     query: async ({ page }) => {
  //       return await getExampleTableApi({
  //         page: page.currentPage,
  //         pageSize: page.pageSize,
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
        category: `h000-${i}`,
        code: `000-${i}`,
        unit: '个',
        customer: '0.4mm',
        amount: 5 * i,
        signatory: '',
        weight: '0.5kg',
        price: '2025',
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

function hasEditStatus(row: RowType) {
  return gridApi.grid?.isEditByRow(row);
}

function editRowEvent(row: RowType) {
  gridApi.grid?.setEditRow(row);
}
const handleToDetail = (row?: {}) => {
  console.log(`🚀 ~ handleToDetail ~ row:`, row);
  router.push({
    path: `/booking/view`,
    // query: {
    //   id: row.hbl_no,
    // },
  });
};
async function saveRowEvent(row: RowType) {
  await gridApi.grid?.clearEdit();

  gridApi.setLoading(true);
  setTimeout(() => {
    gridApi.setLoading(false);
    ElMessage.success(`保存成功！category=${row.id}`);
  }, 600);
}

const cancelRowEvent = (_row: RowType) => {
  gridApi.grid?.clearEdit();
};
onMounted(() => {
  loadList(30);
});
</script>
