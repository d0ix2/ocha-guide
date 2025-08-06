import { Link } from 'react-router-dom';
import * as S from './Card.style';
import { getIcon } from '../../assets/index';

export default function Card({ id, title, caption, icon, lang }) {
  const IconCmp = icon ? getIcon(icon) : null;
  console.log('card icon:', icon);
  return (
    <S.CardWrapper>
      <Link to={`/guide/${id}?lang=${lang}`} aria-label={`${title} 상세로`}>
        <S.Thumb $isIcon={!!IconCmp}>
          {IconCmp ? (
            <IconCmp />
          ) : icon ? (
            <img src={icon} alt="" />
          ) : (
            <S.PlaceholderIcon>🖼️</S.PlaceholderIcon>
          )}
        </S.Thumb>
        <S.Body>
          <S.Title>{title}</S.Title>
          {caption && <S.Caption>{caption}</S.Caption>}
        </S.Body>
      </Link>
    </S.CardWrapper>
  );
}
