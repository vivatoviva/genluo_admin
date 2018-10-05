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
  Modal,
} from 'antd';
import TagSelect from '@/components/TagSelect';
import { connect } from 'dva';


const Option = Select.Option;
const FormItem = Form.Item;
const confirm = Modal.confirm;


function showConfirm(onOk) {
  confirm({
    title: '确定保存吗?',
    content: '点击保存将立刻生效',
    onOk,
    onCancel() {},
  });
}

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

class App extends Component {
  render() {
    console.log(this.props.children);

    return (
      <div>
        <textarea id="md_editor" ref={this.props.editorRef}>
        {
          this.props.children
        }
        </textarea>
      </div>
    );
  }

  componentDidMount(){
    var ele_textarea = document.getElementById('md_editor');
    var mditor =  Mditor.fromTextarea(ele_textarea);
  }
}

@Form.create()
@connect(({ loading, article }) => ({
  article,
  loading: loading.models.article,
}))
class Operate extends Component {
  constructor(props) {
    super(props);
    this.editor =React.createRef()
  }
  
  componentDidMount() {
    const { dispatch, history } = this.props;
    const { id } = this.props.match.params;
    dispatch({
      type: 'article/fetchTags'
    })
    dispatch({
      type: 'article/fetchCategroy'
    })
    dispatch({
      type: 'article/detailArticle',
      payload: {
        id,
      },
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/saveDetail',
      payload: {},
    })
  }

  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const { validateFields } = form;
    const content = this.editor.value;
    const { id } = this.props.match.params;

    validateFields((errors, values) => {
      if(errors) return;
      const params = {
        ...values,
        id,
        categroy: values.categroy[0], 
        content,
      }
      showConfirm(() => {
        return dispatch({
          type: 'article/operate',
          payload: params,
          callback: (id) => {
            this.props.history.push('/article/operate/'+ id)
          }
        })
      })
    })
  }

  handleFromReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  render() {
    const { loading, article: { tags, categroy, detail }} = this.props;
    const { getFieldDecorator } = this.props.form;
    console.log(detail);
    return (
      <div>
        <Card title = "新增文章"
          loading={loading}
          extra = { <div><a href = "#" onClick={this.handleSubmit}> 确定 </a>
          < Divider type = "vertical" /><a onClick={this.handleFromReset}> 重置</a></div> }
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              { ...formItemLayout }
              label="标题"
            >
              {
                getFieldDecorator('title', {
                  rules: [{required: true,}],
                  initialValue: detail && detail.title
                })(
                  <Input placeholder="文章标题"></Input>
                )
              }
            </FormItem>
            <FormItem
              label="分类"
              { ...formItemLayout }
            >
              {getFieldDecorator('categroy', {
                  rules: [{required: true,}],
                  initialValue: detail ? detail.categroy : undefined
              })(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="请选择文章分类"
                >
                {
                  categroy.map(item => (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  ))
                }
                </Select>
              )}
            </FormItem>
            <FormItem
              label="标签"
              { ...formItemLayout }
            >
              {getFieldDecorator('tags', {
                  rules: [{required: true,}],
                  initialValue: detail ? detail.tags : undefined
              })(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="请选择文章的标签"
                >
                {tags.map(item => (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              { ...formItemLayout }
              label="描述"
            >
              {
                getFieldDecorator('descript', {
                  rules: [{required: true,}],
                  initialValue: detail && detail.descript
                })(
                  <Input.TextArea
                    autosize
                    placeholder="描述"
                  ></Input.TextArea>
                )
              }
            </FormItem>
            <FormItem
              { ...formItemLayout }
              label="正文"
            >
              {
                getFieldDecorator('content')(
                  <App editorRef={el=>this.editor=el}>
                    {
                      detail && detail.content
                    }
                  </App>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
      )
    }
  }
  export default Operate;