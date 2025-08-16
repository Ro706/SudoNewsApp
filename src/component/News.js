import { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  // ✅ Destructure props
  const { country, category, apiKey, pageSize, setProgress } = props;

  const [articles, setArticles] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // ✅ Utility to capitalize
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // ✅ Fetch initial news (memoized)
  const updateNews = useCallback(async () => {
    try {
      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=${category}&page=${page}&pageSize=${pageSize}`;
      setLoading(true);

      const data = await fetch(url);
      setProgress(30);
      const parsedData = await data.json();
      setProgress(70);

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);

      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
      setLoading(false);
    }
  }, [setProgress, apiKey, category, page, pageSize]);

  // ✅ Fetch more data for infinite scroll
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

      setPage(nextPage);

      const data = await fetch(url);
      const parsedData = await data.json();

      setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  // ✅ Run on mount & when props change
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - Sudo News`;
    updateNews();
  }, [category, updateNews]);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: '35px 0px', marginTop: '90px' }}
      >
        Sudo News - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length} // ✅ safe because always an array
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ''}
                  description={element.description || ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// ✅ Default props
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

// ✅ Prop types
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
