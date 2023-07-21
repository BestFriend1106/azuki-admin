// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BorderOutlined,
  BoxPlotOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SmileOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  GatewayOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'walletList-page',
      title: <FormattedMessage id="walletList-page" />,
      type: 'item',
      url: '/walletList-page',
      icon: icons.ChromeOutlined
    },
    {
      id: 'Spot-page',
      title: <FormattedMessage id="spot-page" />,
      type: 'item',
      url: '/spot-page',
      icon: icons.ChromeOutlined
    }
  ]
};

export default other;
