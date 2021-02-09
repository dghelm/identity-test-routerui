import React, { useState, useEffect } from 'react';
import { Carousel, Breadcrumb, Button, List, Typography, Avatar } from 'antd';
const { Title } = Typography;

const ProviderItem = ({ provider, style, select }) => {
  // const item = data[index];
  // console.log(provider);
  const { label, skylink, description, avatar } = provider;
  const avatarElement =
    'img' in avatar ? (
      <Avatar size="large" src={avatar.img} />
    ) : (
      <Avatar size="large" icon={avatar.icon} />
    );
  return (
    <List.Item key={skylink} style={style}>
      <List.Item.Meta
        avatar={avatarElement}
        title={label}
        description={description}
      />
      <Button onClick={() => select(skylink ? skylink : 'other')}>
        Select
      </Button>
    </List.Item>
  );
};

const ProviderSelectorList = ({
  interfaceLabel,
  providers,
  onSelect,
  onCancel,
  selectedUrl,
}) => {
  const [chosenProvider, setChosenProvider] = useState('');
  const [otherProvider, setOtherProvider] = useState('');

  const selectProvider = (selected) => {
    if (selected !== 'other') {
      onSelect(selected);
    } else {
      selectOther();
    }
  };

  const selectOther = () => {
    console.log('now show form for submission');
    onSelect('other');
  };

  return (
    <>
      <Title level={4}>Select Your {interfaceLabel} Provider</Title>
      <Carousel>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={providers}
            renderItem={(item) => {
              return (
                <ProviderItem
                  provider={item}
                  select={selectProvider}
                  style={{}}
                />
              );
            }}
          />
        </div>

        <div>Other Form</div>
      </Carousel>
    </>
  );
};

export default ProviderSelectorList;
