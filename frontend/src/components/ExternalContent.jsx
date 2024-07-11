import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExternalContent = ({ url }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExternalContent = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'text/html',
          },
        });
        setContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching external content:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchExternalContent();
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching external content: {error.message}</p>;

  return (
    <div
      className="external-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default ExternalContent;
