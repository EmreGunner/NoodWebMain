import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteMetadata } from '../config/metadata';

interface DocumentTitleProps {
  title?: string;
  description?: string;
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ 
  title, 
  description 
}) => {
  const location = useLocation();
  const pageTitle = title 
    ? `${title} | ${siteMetadata.siteName}`
    : siteMetadata.title;

  useEffect(() => {
    document.title = pageTitle;
    
    // Update meta description if provided
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update OG meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogDesc && description) ogDesc.setAttribute('content', description);
    if (ogUrl) ogUrl.setAttribute('content', `${siteMetadata.siteUrl}${location.pathname}`);
  }, [pageTitle, description, location]);

  return null;
};

export default DocumentTitle; 