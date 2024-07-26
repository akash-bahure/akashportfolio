import fetch from 'node-fetch'; // Use import instead of require

const token = 'aMN8zXF51uj5dEqm7eqACcUR'; // Replace with your actual API token
const projectId = 'prj_TRmNvDsCGGTP6FGRk6Mz9DZrB4wI'; // Replace with your Vercel project ID
const pageSlug = '/blog/discover-your-creative-edge-with-figma-top-design-platform'; // Replace with the actual slug

async function fetchPageViews() {
  try {
    const response = await fetch(`https://api.vercel.com/v6/analytics/projects/${projectId}/events?path=${encodeURIComponent(pageSlug)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text(); // Read the response body for more details
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching page views:', error);
  }
}

// Example usage
fetchPageViews()
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
