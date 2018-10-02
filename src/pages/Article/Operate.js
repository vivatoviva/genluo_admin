import React, {
  Component,
  Fragment
} from 'react';
import {
  Card,
  Divider,
  Form,
  Input,
  Select,
} from 'antd';
import TagSelect from '@/components/TagSelect';

const Option = Select.Option;
const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

@Form.create()
class Operate extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title = "新增文章"
          extra = { < a href = "#" > 确定 < Divider type = "vertical" / > 重置 < /a> }
        >
          <Form>
            <FormItem
              { ...formItemLayout }
              label="标题"
            >
              {
                getFieldDecorator('title')(
                  <Input placeholder="文章标题"></Input>
                )
              }
            </FormItem>
            <FormItem
              label="分类"
              { ...formItemLayout }
            >
              {getFieldDecorator('category', {
              })(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Tags Mode"
                >
                </Select>
              )}
            </FormItem>
            <FormItem
              label="标签"
              { ...formItemLayout }
            >
              {getFieldDecorator('category')(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Tags Mode"
                >
                </Select>
              )}
            </FormItem>
          </Form>
        </Card>
        <Card>
                    
        </Card>
      </div>
      )
    }
  }
  export default Operate;