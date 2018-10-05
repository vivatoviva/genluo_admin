import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router'

import {
  Form,
  Card,
  Select,
  List,
  Input,
  Tag,
  Divider,
  Badge,
  Icon,
  Avatar,
  Row,
  Col,
  Button,
  DatePicker,
} from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Articles.less';
import StandardTable from '@/components/StandardTable';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const statusMap = {
  'delete': 'error',
  'online': 'success'
}
const status = {
  'delete':'删除',
  'online': '在线'
};

@connect(({ list, loading, article,  rules }) => ({
  list,
  rules,
  article,
  loading: loading.models.article,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    let paramsData = allValues;
    if(paramsData.tagId && paramsData.tagId.length > 0) {
      paramsData.tagId = paramsData.tagId.map(item => parseInt(item.split('@')[0]), 10)
    } else {
      paramsData.tagId = undefined;
    }
    if(paramsData.categroyId && paramsData.categroyId.length>0) {
    } else {
      paramsData.categroyId = undefined;
    }
    if(paramsData.date && paramsData.date.length > 0) {
      paramsData.date = paramsData.date.map(item =>
          item.format('YYYY-MM-DD HH:MM:SS')
        );
    } else {
      paramsData.date = undefined;
    }
    dispatch({
      type: 'article/fetchList',
      payload: paramsData,
    });
  },
})

class SearchList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetchList'
    })
    dispatch({
      type: 'article/fetchTags'
    })
    dispatch({
      type: 'article/fetchCategroy'
    })
  }
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, article: { queryParam } } = this.props;
    const { formValues } = this.state;

    console.log(sorter);

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    console.log(sorter.field);
    const params = {
      ...queryParam,
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      let order = '';
      if(sorter.order.includes('asc')) {
        order='asc'
      } else {
        order = 'desc'
      }

      params.sort = {
        columnKey: sorter.columnKey,
        order,
      };
    }
    dispatch({
      type: 'article/fetchList',
      payload: params,
    });
  };

  handleAddClick = () => {
    this.props.history.push('/article/operate')
  }

  handleDeleteClick = () => {
    const { selectedRows, } = this.state;
    const { dispatch, article: { queryParam } } = this.props;
    const deleteId = selectedRows.map(item => item.article_id);
    dispatch({
      type: 'article/deleteArticle',
      payload: {
        deleteId,
        queryParam,
      },
    }).then(()=> {
      this.setState({
        selectedRows: [],
      })
    })
  }

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '阅读数',
      dataIndex: 'read_num',
      sorter: true,
      align: 'center',
    },
    {
      title: '分类',
      dataIndex: 'categroy_name',
      align: 'center',
      render: val => `${val} `,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: 'tags',
      dataIndex: 'status',
      render(val) {
        return '前端、后台、服务器';
      },
    },
    {
      title: '状态',
      dataIndex: 'STATUS',
      render(val) {
        return <Badge status={statusMap[val] || 'success'} text={status[val] || '在线'} />;
      },
    },
    {
      title: '发表时间',
      dataIndex: 'create_time',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'article_id',
      render: (value) => (
        <Fragment>
          <Link to={`/article/operate/${value}`}>编辑</Link>
        </Fragment>
      ),
    },
  ];

  render() {
    const {
      form,
      article: { tags, categroy, data },
      loading,
    } = this.props;
    const tableList = data.list.map(item => ({ ...item, disabled: item.STATUS === 'delete'}))
    const tableData = {
      list: tableList,
      pagination: data.pagination,
    }

    const { getFieldDecorator } = form;
    const { selectedRows } = this.state;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };


    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="类别" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('categroyId')(
                  
                  <TagSelect expandable>
                    {
                      categroy.map(item => <TagSelect.Option value={item.id}>{item.name}</TagSelect.Option>)
                    }
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="标签" grid>
              <Row>
                <Col lg={16} md={24} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('tagId')(
                      <Select
                        mode="multiple"
                        style={{ minWidth: '300px' ,width: '100%' }}
                        placeholder="选择文章标签"
                      >
                        {tags.map(item => (
                          <Option key={item.id} value={item.id+'@'+item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="选项" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="文章状态">
                    {getFieldDecorator('status', {})(
                      <Select
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="online">在线</Option>
                        
                        <Option value="delete">删除</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="发表时间">
                  {getFieldDecorator('date')(
                    <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
                  )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <div
            style={{margin: '10px 0 15px'}}
          >
            <Button
              type="primary"
              style={{marginRight: '20px'}}
              onClick={this.handleAddClick}
              ><Icon type="plus" theme="outlined" /> 新建</Button>
            {
              !!selectedRows.length &&
              <Button onClick={this.handleDeleteClick} type="danger"><Icon type="delete" theme="outlined" /> 删除</Button>
            }
          </div>
         
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={tableData}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </Fragment>
    );
  }
}

export default SearchList;
