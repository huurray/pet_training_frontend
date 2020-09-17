import React, {FunctionComponent} from 'react';
import {ActiveRnIconProps} from './type';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ActiveIoniconsIcons: FunctionComponent<ActiveRnIconProps> = ({
  active,
  activeName,
  deactiveName,
  size,
  activeColor,
  deactiveColor,
}) => {
  return active ? (
    <IoniconsIcon color={activeColor} name={activeName} size={size} />
  ) : (
    <IoniconsIcon color={deactiveColor} name={deactiveName} size={size} />
  );
};

export const ActiveMaterialCommunityIcons: FunctionComponent<ActiveRnIconProps> = ({
  active,
  activeName,
  deactiveName,
  size,
  activeColor,
  deactiveColor,
}) => {
  return active ? (
    <MaterialCommunityIcon color={activeColor} name={activeName} size={size} />
  ) : (
    <MaterialCommunityIcon
      color={deactiveColor}
      name={deactiveName}
      size={size}
    />
  );
};
