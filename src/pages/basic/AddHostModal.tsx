import { DatePicker, Form, Modal, Select, Switch, Input, Button } from "antd"
import dayjs from "dayjs"
import '../index.less'
import { useEffect } from "react"

const BIRTHTIME = [{
  label: '早子时(00:00~01:00)',
  value: 0
}, {
  label: '丑时(01:00~03:00)',
  value: 1
}, {
  label: '寅时(03:00~05:00)',
  value: 2
}, {
  label: '卯时(05:00~07:00)',
  value: 3
}, {
  label: '辰时(07:00~09:00)',
  value: 4
}, {
  label: '巳时(09:00~11:00)',
  value: 5
}, {
  label: '午时(11:00~13:00)',
  value: 6
}, {
  label: '未时(13:00~15:00)',
  value: 7
}, {
  label: '申时(15:00~17:00)',
  value: 8
}, {
  label: '酉时(17:00~19:00)',
  value: 9
}, {
  label: '戌时(19:00~21:00)',
  value: 10
}, {
  label: '亥时(21:00~23:00)',
  value: 11
}, {
  label: '晚子时(23:00~00:00)',
  value: 12
}]
const dateFormat = 'YYYY-MM-DD'

const AddHostModal = (props: { visible: any; hide: any; submit: any }) => {
  const { visible, hide, submit } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])

  const onFinish = (values) => {
    values.birthday = values.birthday.format(dateFormat)
    submit(values)
  }

  const onFinishFailed = () => {

  }

  const disabledDate = (cur) => {
    return cur && cur > new Date()
  }

  return (
    <Modal
      title="添加"
      open={visible}
      onCancel={hide}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="name"
          initialValue=""
        >
          <Input placeholder="匿名" />
        </Form.Item>
        <Form.Item
          label="日历格式"
          name="birthdayType"
          initialValue="solar"
          required
        >
          <Select
            style={{ width: '100%' }}
          >
            <Select.Option value="solar">阳历</Select.Option>
            <Select.Option value="lunar">阴历</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="出生日期"
          name="birthday"
          initialValue={dayjs('2000-01-01', dateFormat)}
          required
        >
          <DatePicker disabledDate={disabledDate} format={dateFormat} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="出生时辰"
          name="birthTime"
          initialValue={0}
          required
        >
          <Select options={BIRTHTIME} />
        </Form.Item>
        <Form.Item
          label="性别"
          name="general"
          initialValue="male"
          required
        >
          <Select
            style={{ width: '100%' }}
          >
            <Select.Option value="male">男</Select.Option>
            <Select.Option value="female">女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="是否闰月"
          name="fixLeap"
          initialValue={false}
          required
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="备注"
          name="desctiption"
          initialValue=""
        >
          <Input.TextArea rows={2} placeholder="请输入备注信息" />
        </Form.Item>
        <div className="rowEnd">
          <Button onClick={hide}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
            确定
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddHostModal