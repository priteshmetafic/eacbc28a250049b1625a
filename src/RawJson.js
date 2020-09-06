import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RawJson = ({route}) => {
  const {json} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raw JSON Response</Text>
      <Text>{JSON.stringify(json)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  title: {
      alignSelf: 'center',
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 18,
  },
});

export default RawJson;
