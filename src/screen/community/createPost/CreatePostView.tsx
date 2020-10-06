import React, {Component, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles,
  convertToHtmlString,
  convertToObject,
} from 'react-native-cn-richtext-editor';
import constant from '../../../../constant';
import {
  IoniconsIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '../../../components/icons/RnIcons';
import ImagePicker from 'react-native-image-picker';
import cStyles from '../../../../cStyles';
import CreatePostHandle from './CreatePostHandle';

const defaultStyles = getDefaultStyles();

class CreatePostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      value: [getInitialObject()],
    };
    this.editor = null;
  }

  onStyleKeyPress = (toolType) => {
    if (toolType === 'image') {
      ImagePicker.launchImageLibrary(
        {
          title: 'Select Avatar',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
        },
        (response) => {
          if (response.path === undefined) {
            null;
          } else {
            this.editor.insertImage('file://' + response.path);
          }
        },
      );
    } else if (toolType === 'video') {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'video',
          videoQuality: 'high',
          durationLimit: 30000,
          allowsEditing: true,
        },
        (response) => {
          if (response.path === undefined) {
            null;
          } else {
            this.editor.insertImage('file://' + response.path);
            this.editor.applyToolbar(toolType);
          }
        },
      );
    } else {
      this.editor.applyToolbar(toolType);
    }
  };

  onSelectedTagChanged = (tag) => {
    this.setState({
      selectedTag: tag,
    });
  };

  onSelectedStyleChanged = (styles) => {
    this.setState({
      selectedStyles: styles,
    });
  };

  onValueChanged = (value) => {
    this.setState({
      value: value,
    });
  };

  onRemoveImage = (e) => {
    console.log(e);
  };

  imageComponent = (e) => {
    console.log(e);
  };

  render() {
    let html = convertToHtmlString(this.state.value);
    const navigation = this.props.navigation;
    return (
      <>
        <CreatePostHandle
          html={html}
          convertToObject={convertToObject}
          convertToHtmlString={convertToHtmlString}
          navigation={navigation}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : null}
          enabled
          style={{
            flex: 1,
            // paddingTop: 20,
            // backgroundColor: '#eee',
            // flexDirection: 'column',
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
              <CNRichTextEditor
                ref={(input) => (this.editor = input)}
                onSelectedTagChanged={this.onSelectedTagChanged}
                onSelectedStyleChanged={this.onSelectedStyleChanged}
                value={this.state.value}
                style={{width: constant.width, backgroundColor: 'white'}}
                styleList={defaultStyles}
                onValueChanged={this.onValueChanged}
                onRemoveImage={this.onRemoveImage}
                ImageComponent={({source, style}): any => {
                  const checkVideo = source.uri.split('.')[1];
                  return checkVideo === 'mp4' ? (
                    <View>
                      <Image
                        source={{
                          uri: source.uri,
                        }}
                        style={{width: constant.width, height: style.height}}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          width: constant.width,
                          height: style.height,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialIcons
                          name={'play-circle-fill'}
                          size={70}
                          color={cStyles.BorderLightGrayColor}
                        />
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Image
                        source={{
                          uri: source.uri,
                        }}
                        style={{width: constant.width, height: style.height}}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View
          style={{
            minHeight: 10,
          }}>
          <CNToolbar
            style={{
              height: 50,
              backgroundColor: cStyles.BorderLightGrayColor,
            }}
            iconSetContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
            size={30}
            iconSet={[
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'image',
                    iconComponent: (
                      <IoniconsIcons
                        name={'image-outline'}
                        size={20}
                        color={'black'}
                      />
                    ),
                  },
                ],
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'video',
                    iconComponent: (
                      <IoniconsIcons
                        name={'videocam-outline'}
                        size={20}
                        color={'black'}
                      />
                    ),
                  },
                ],
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'bold',
                    buttonTypes: 'style',
                    iconComponent: (
                      <MaterialIcons
                        name={'format-bold'}
                        color={'black'}
                        size={20}
                      />
                    ),
                  },
                ],
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'body',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <Text style={styles.toolbarButton}>body</Text>
                    ),
                  },
                ],
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'ul',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons
                        name={'format-list-bulleted'}
                        size={20}
                        color={'black'}
                      />
                    ),
                  },
                ],
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'ol',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons
                        name={'format-list-numbered'}
                        size={20}
                        color={'black'}
                      />
                    ),
                  },
                ],
              },
            ]}
            selectedTag={this.state.selectedTag}
            selectedStyles={this.state.selectedStyles}
            onStyleKeyPress={this.onStyleKeyPress}
          />
        </View>
      </>
    );
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 1,
    alignItems: 'stretch',
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
  },
  italicButton: {
    fontStyle: 'italic',
  },
  boldButton: {
    fontWeight: 'bold',
  },
  underlineButton: {
    textDecorationLine: 'underline',
  },
  lineThroughButton: {
    textDecorationLine: 'line-through',
  },
});

export default CreatePostView;

// const CreatePostView = ({navigation, navigation: {goBack}}) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedTag, setSelectedTag] = useState('body');
//   const [selectedStyles, setSelectedStyles] = useState([]);
//   const [value, setValue] = useState([getInitialObject()]);
//   const editor: any = useRef(null);
//   let html = convertToHtmlString(value);
//   console.log(html);
//   const onStyleKeyPress = ({toolType}) => {
//     if (toolType === 'image') {
//       ImagePicker.launchImageLibrary(
//         {
//           title: 'Select Avatar',
//           storageOptions: {
//             skipBackup: true,
//             path: 'images',
//           },
//           maxWidth: 500,
//           maxHeight: 500,
//           quality: 0.5,
//         },
//         (response) => {
//           if (response.path === undefined) {
//             null;
//           } else {
//             editor.current.insertImage('file://' + response.path);
//           }
//         },
//       );
//     } else if (toolType === 'video') {
//       ImagePicker.launchImageLibrary(
//         {
//           mediaType: 'video',
//           videoQuality: 'high',
//           durationLimit: 30000,
//           allowsEditing: true,
//         },
//         (response) => {
//           if (response.path === undefined) {
//             null;
//           } else {
//             editor.current.insertImage('file://' + response.path);
//             editor.current.applyToolbar(toolType);
//           }
//         },
//       );
//     } else {
//       editor.current.applyToolbar(toolType);
//     }
//   };

//   const onSelectedTagChanged = ({tag}) => {
//     setSelectedTag(tag);
//   };

//   const onSelectedStyleChanged = ({styles}) => {
//     setSelectedStyles(styles);
//   };

//   const onValueChanged = (value) => {
//     setValue(value);
//   };

//   const onRemoveImage = ({e}) => {
//     console.log(e);
//   };

//   const imageComponent = (e) => {
//     console.log(e);
//   };

//   return (
//     <>
//       <CreatePostHandle
//         html={html}
//         convertToObject={convertToObject}
//         convertToHtmlString={convertToHtmlString}
//         isLoading={isLoading}
//         setIsLoading={setIsLoading}
//         goBack={goBack}
//       />
//       <KeyboardAvoidingView
//         behavior={Platform.OS == 'ios' ? 'padding' : null}
//         enabled
//         style={{
//           flex: 1,
//           // paddingTop: 20,
//           // backgroundColor: '#eee',
//           // flexDirection: 'column',
//         }}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.main}>
//             <CNRichTextEditor
//               ref={editor}
//               onSelectedTagChanged={(tag) => onSelectedTagChanged({tag})}
//               onSelectedStyleChanged={(styles) =>
//                 onSelectedStyleChanged({styles})
//               }
//               value={value}
//               style={{width: constant.width, backgroundColor: 'white'}}
//               styleList={defaultStyles}
//               onValueChanged={(value) => onValueChanged(value)}
//               onRemoveImage={(e) => onRemoveImage({e})}
//               ImageComponent={({source, style}): any => {
//                 const checkVideo = source.uri.split('.')[1];
//                 return checkVideo === 'mp4' ? (
//                   <View>
//                     <Image
//                       source={{
//                         uri: source.uri,
//                       }}
//                       style={{width: constant.width, height: style.height}}
//                     />
//                     <View
//                       style={{
//                         position: 'absolute',
//                         width: constant.width,
//                         height: style.height,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <MaterialIcons
//                         name={'play-circle-fill'}
//                         size={70}
//                         color={cStyles.BorderLightGrayColor}
//                       />
//                     </View>
//                   </View>
//                 ) : (
//                   <View>
//                     <Image
//                       source={{
//                         uri: source.uri,
//                       }}
//                       style={{width: constant.width, height: style.height}}
//                     />
//                   </View>
//                 );
//               }}
//             />
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//       <View
//         style={{
//           minHeight: 10,
//         }}>
//         <CNToolbar
//           style={{
//             height: 50,
//             backgroundColor: cStyles.BorderLightGrayColor,
//           }}
//           iconSetContainerStyle={{
//             flexGrow: 1,
//             justifyContent: 'space-evenly',
//             alignItems: 'center',
//           }}
//           size={30}
//           iconSet={[
//             {
//               type: 'tool',
//               iconArray: [
//                 {
//                   toolTypeText: 'image',
//                   iconComponent: (
//                     <IoniconsIcons
//                       name={'image-outline'}
//                       size={20}
//                       color={'black'}
//                     />
//                   ),
//                 },
//               ],
//             },
//             {
//               type: 'tool',
//               iconArray: [
//                 {
//                   toolTypeText: 'video',
//                   iconComponent: (
//                     <IoniconsIcons
//                       name={'videocam-outline'}
//                       size={20}
//                       color={'black'}
//                     />
//                   ),
//                 },
//               ],
//             },
//             {
//               type: 'tool',
//               iconArray: [
//                 {
//                   toolTypeText: 'bold',
//                   buttonTypes: 'style',
//                   iconComponent: (
//                     <MaterialIcons
//                       name={'format-bold'}
//                       color={'black'}
//                       size={20}
//                     />
//                   ),
//                 },
//               ],
//             },
//             {
//               type: 'tool',
//               iconArray: [
//                 {
//                   toolTypeText: 'body',
//                   buttonTypes: 'tag',
//                   iconComponent: <Text style={styles.toolbarButton}>body</Text>,
//                 },
//               ],
//             },
//             {
//               type: 'tool',
//               iconArray: [
//                 {
//                   toolTypeText: 'ul',
//                   buttonTypes: 'tag',
//                   iconComponent: (
//                     <MaterialCommunityIcons
//                       name={'format-list-bulleted'}
//                       size={20}
//                       color={'black'}
//                     />
//                   ),
//                 },
//               ],
//             },
//             {
//               type: 'tool',
//               iconArray: [
//                 {
//                   toolTypeText: 'ol',
//                   buttonTypes: 'tag',
//                   iconComponent: (
//                     <MaterialCommunityIcons
//                       name={'format-list-numbered'}
//                       size={20}
//                       color={'black'}
//                     />
//                   ),
//                 },
//               ],
//             },
//           ]}
//           selectedTag={selectedTag}
//           selectedStyles={selectedStyles}
//           onStyleKeyPress={(toolType) => onStyleKeyPress({toolType})}
//         />
//       </View>
//     </>
//   );
// };

// var styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     paddingBottom: 1,
//     alignItems: 'stretch',
//   },
//   toolbarButton: {
//     fontSize: 20,
//     width: 28,
//     height: 28,
//     textAlign: 'center',
//   },
//   italicButton: {
//     fontStyle: 'italic',
//   },
//   boldButton: {
//     fontWeight: 'bold',
//   },
//   underlineButton: {
//     textDecorationLine: 'underline',
//   },
//   lineThroughButton: {
//     textDecorationLine: 'line-through',
//   },
// });

// export default CreatePostView;
