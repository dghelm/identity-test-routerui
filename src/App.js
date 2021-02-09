import ProviderSelector from './components/ProviderSelector';
// import ProviderSelectorList from './components/ProviderSelectorList';
import useBrowserContextCommunication from 'react-window-communication-hook';
import { ExperimentOutlined, ExportOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
// import './App.css';

function App() {
  const providers = [
    {
      label: 'SkyID',
      skylink: 'sia://skyid.hns',
      description:
        'SkyId is a seed-based login identity and seed management system.',
      avatar: {
        img:
          'https://sky-id.hns.siasky.net/assets/img/brand/SkyID_Logo_128.png',
      },
    },
    {
      label: 'Dummy Provider',
      skylink: 'sia://dummyprovider',
      description: 'Dummy Provider does just about nothing.',
      avatar: {
        icon: <ExperimentOutlined />,
      },
    },
    {
      label: 'Other Provider...',
      description: 'Advanced users, specify a skylink to use as your provider.',
      avatar: {
        icon: <ExportOutlined />,
      },
    },
  ];

  const onCancel = () => {
    // window.close();
    console.log("Call parent and say 'close me'");
    window.opener.postMessage('close', '*');
  };

  const onSelect = (selection) => {
    console.log('send window communication with url selected');
    // console.log(selection);
    window.opener.postMessage({ skylink: selection }, '*');
    console.log(window.opener);
  };

  return (
    <div className="App">
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <ProviderSelector
            interfaceLabel="Identity"
            providers={providers}
            onCancel={onCancel}
            onSelect={onSelect}
          />
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
}

export default App;
