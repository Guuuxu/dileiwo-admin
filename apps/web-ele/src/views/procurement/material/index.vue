<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ElMessage, ElButton } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getExampleTableApi } from '../../mock-api';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  name: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      defaultValue: '',
      fieldName: 'productName',
      label: '物料名称',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'productName', title: '名称' },
    { field: 'category', title: '代号' },
    { field: 'weight', title: '重量' },
    { field: 'currency', title: '单位' },
    { field: 'price', title: '数量' },
    { field: 'price', title: '单价' },
    { field: 'price', title: '总价' },
    // { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
  ],
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    // 是否显示搜索表单控制按钮
    // @ts-ignore 正式环境时有完整的类型声明
    search: true,
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });

const handleAdd = () => {};
</script>

<template>
  <div class="vp-raw w-full">
    <Grid>
      <!-- <template #toolbar-tools>
        <ElButton class="mr-2" type="primary" @click="handleAdd">
          新增
        </ElButton>
      </template> -->
    </Grid>
  </div>
</template>
