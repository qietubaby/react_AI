import React from 'react';
import { Image, List } from 'semantic-ui-react';

import './style.scss';

export default function Img({ photo, switchPhoto, active }) {
 let inActive = active ? 'active imgWrap' : 'imgWrap'
 return (
  <List.Item onClick={ev => { switchPhoto(photo) }} className={inActive}>
   <Image src={photo.src} size="tiny" className="img" />
  </List.Item>
 );
}
