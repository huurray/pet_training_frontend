import React, {useState, SFC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_POST} from '../CommunityQueries';
import PostText from './PostText';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import cStyles from '../../../../cStyles';
import {moderateScale} from 'react-native-size-matters';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const PostScreenView: SFC<Props> = ({navigation}) => {
  const [petType, setPetType] = useState('강아지');

  const {data, loading} = useQuery(SEE_POST, {
    variables: {
      petType,
      pageNumber: 0,
      items: 20,
    },
    fetchPolicy: 'network-only',
  });

  let posts;

  if (
    data &&
    data.SeePost &&
    data.SeePost.result &&
    data.SeePost.result.length > 0
  ) {
    posts = data && data.SeePost && data.SeePost.result;
  }

  return loading ? null : (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {posts &&
          posts.map((post, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('SeeDetailPost', {post})}>
              <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>{post.title}</Text>
                <PostText text={post.text} />
              </View>
            </TouchableWithoutFeedback>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: cStyles.BorderLightGrayColor,
  },
  titleWrapper: {
    paddingTop: moderateScale(10),
    backgroundColor: 'white',
    marginBottom: moderateScale(10),
  },
  titleText: {
    fontWeight: '700',
    fontSize: moderateScale(20),
    marginBottom: moderateScale(10),
  },
});

export default PostScreenView;
