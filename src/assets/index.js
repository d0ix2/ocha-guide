import { ReactComponent as dormitoryIcon } from './icons/dormitory.svg';
import { ReactComponent as documentIcon } from './icons/document.svg';
import { ReactComponent as schoolIcon } from './icons/school.svg';
import { ReactComponent as noticeIcon } from './icons/notice.svg';

export const ICONS = {
  dormitory: dormitoryIcon,
  document: documentIcon,
  school: schoolIcon,
  notice: noticeIcon,
  // administrative: AdminIcon, ...
};

export function getIcon(name) {
  return ICONS[name] || null;
}

// export function Icon({ name, ...props }) {
//   const C = getIcon(name);
//   return C ? <C {...props} /> : null;
// }
