import React, { FC, memo } from 'react';
import { Table } from 'antd';
import { StyledUnderway } from '@/pages/project/underway/style';
const Underway: FC = () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <StyledUnderway>
      <Table size={'small'} dataSource={dataSource} columns={columns} />
    </StyledUnderway>
  );
};
export default memo(Underway);
