import react from 'react';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container, Content, Text, Input, Item, Spinner, Label} from 'native-base';
import Post from './Post';

const Posts = () => {
  const URL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=';
  const [page, setPage] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const getData = () => {
    if ((page + 1) * 20 > posts.length) {
      fetch(`${URL}${page}`)
        .then((response) => response.json())
        .then((json) => {
          setPosts((posts) => [...posts, ...json.hits]);
          setData((data) => [...data, ...json.hits]);
        });
    }
  };

  const updatePage = () => {
    setPage((page) => page + 1);
  };

  React.useEffect(() => {
    if (page !== 0) {
      getData();
    }
  }, [page]);

  React.useEffect(() => {
    // Fetch data Once
    getData();

    // set interval for 10 seconds
    const interval = setInterval(() => {
      updatePage();
    }, 10000);

    //clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
    if (text) {
      filterData(text);
    }
  };

  const filterData = (query) => {
    console.log(query);
    if (!query) {
      console.log('Restored posts');
      setData(posts);
      return;
    }
    const titleList = posts.filter(
      (e) =>
        e.title && e?.title.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    const authorList = posts.filter(
      (e) =>
        e.author && e?.author.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    const urlList = posts.filter(
      (e) => e.url && e.url.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    setData([...titleList, ...authorList, ...urlList]);
  };

  if (posts.length === 0) {
    return (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Item fixedLabel>
        <Input
          style={styles.search}
          placeholder="Search title, author, or url"
          value={search}
          onChangeText={updateSearch}
        />
      </Item>
      <FlatList
        onEndReached={updatePage}
        onEndReachedThreshold={0.5}
        data={data}
        renderItem={({item, index}) => <Post post={item} key={index} />}
        keyExtractor={(post, index) => index.toString()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  search: {
    alignSelf: 'center',
    fontSize: 16,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D8D8',
    marginBottom: 28,
    marginTop: 24,
    textAlign: 'center',
    marginHorizontal: 14,
  },
});

export default Posts;
