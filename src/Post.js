import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, Body} from 'native-base';

const Post = ({post}) => {
  const navigation = useNavigation();
  const date = new Date(post.created_at);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('RawJson', {json: post})}>
      <Card style={styles.card}>
        <CardItem header>
          <Text>{post.title}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={styles.url}>{post.url}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <View style={styles.row}>
            <Text style={styles.author}>By {post.author}</Text>
            <Text style={styles.created}>{date.toLocaleString()}</Text>
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 6,
    paddingBottom: 6,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#555555',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  url: {
    color: '#222222',
    fontSize: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
  },
  author: {
    fontWeight: '600',
  },
  created: {
    flex: 1,
    textAlign: 'right',
    color: '#222222',
  },
});

export default Post;
