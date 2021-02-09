import React, { useState, useEffect } from 'react';
import { Typography, Form, Input, Button, Radio } from 'antd';
const { Title } = Typography;

const ProviderButtons = ({ providers, style }) => {
  const buttons = providers.map(({ label, skylink }) => {
    return (
      <Radio.Button
        style={style}
        key={skylink}
        value={skylink ? skylink : 'other'}
      >
        {label}
      </Radio.Button>
    );
  });

  return buttons;
};

const radioStyle = {
  display: 'block',
  // height: '30px',
  // lineHeight: '30px',
};

const ProviderSelector = ({
  interfaceLabel,
  providers,
  onSelect,
  onCancel,
  selectedUrl,
}) => {
  const [chosenProvider, setChosenProvider] = useState('');
  const [otherProvider, setOtherProvider] = useState('');
  const [form] = Form.useForm();

  // useEffect(() => {
  //   console.log(chosenProvider);
  // }, [chosenProvider]);

  const onFinish = (values) => {
    // console.log(values);
    if (chosenProvider && chosenProvider !== 'other') {
      onSelect(chosenProvider);
    } else if (chosenProvider === 'other' && otherProvider) {
      onSelect(otherProvider);
    }
  };

  return (
    <>
      <Title level={4}>Select Your {interfaceLabel} Provider</Title>
      <Form
        name="provider-select"
        form={form}
        onFinish={onFinish}
        initialValues={{ provider: '', otherProvider: '' }} // this can be used to init with local storage options
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item
          label={`${interfaceLabel} Provider`}
          name="provider"
          rules={[{ required: true, message: 'Please select a provider.' }]}
        >
          <Radio.Group
            value={chosenProvider}
            onChange={(e) => setChosenProvider(e.target.value)}
          >
            <ProviderButtons style={radioStyle} providers={providers} />
            {/* <Radio.Button style={radioStyle} value="other">
            Other...
          </Radio.Button> */}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={'other'}
          name="other"
          rules={[
            {
              required: chosenProvider === 'other',
              message: 'Please type a provider URL or select another provider.',
            },
          ]}
        >
          <Input
            value={otherProvider}
            onChange={(e) => setOtherProvider(e.target.value)}
            disabled={chosenProvider !== 'other'}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            disabled={
              !chosenProvider || (chosenProvider === 'other' && !otherProvider)
            }
          >
            Select
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProviderSelector;
