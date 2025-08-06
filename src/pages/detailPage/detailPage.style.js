import styled from 'styled-components';

export const Container = styled.div`
  max-width: 880px; 
  margin: 32px auto; 
  padding: 50px 16px;
  color: ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.background};
`;

export const Breadcrumb = styled.div`
  margin-bottom: 12px; 
  color: ${({ theme }) => theme.color.primary};
  
  a { text-decoration: none; }
`;

export const ErrorBox = styled.div`
  padding: 12px; 
  background: #fee2e2; 
  border: 1px solid #fecaca; 
  border-radius: 8px;
`;
