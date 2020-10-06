import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  MaterialCommunityIcons,
  IoniconsIcons,
} from '../../../components/icons/RnIcons';
import cStyles from '../../../../cStyles';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import constant from '../../../../constant';
import options from '../../../../apollo';
import axios from 'axios';
import {useMutation} from 'react-apollo-hooks';
import {CREATE_POST, SEE_POST} from '../CommunityQueries';
import {ProcessingManager} from 'react-native-video-processing';
import PickAnimalModal from './pickAnimalModal';
import Modal from 'react-native-modal';
import LoadingDots from 'react-native-loading-dots';

const CreatePostHandle = ({
  html,
  convertToObject,
  convertToHtmlString,
  navigation: {goBack},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [pickAnimalTypeModal, setPickAnimalTypeModal] = useState<boolean>(
    false,
  );
  const [pickAnimalType, setPickAnimalType] = useState<string>('강아지');

  const onChange = (text) => {
    setValue(text);
  };

  let convertObjectHtml = convertToObject(html);

  const imageArray = convertObjectHtml
    .filter((obj) => obj.component === 'image')
    .map((item) => item.url);

  const [createPostMutation] = useMutation(CREATE_POST, {
    refetchQueries: () => [{query: SEE_POST}],
    awaitRefetchQueries: true,
  });

  const compressOptions = {
    width: 720,
    height: 1280,
    bitrateMultiplier: 3,
    saveToCameraRoll: true, // default is false, iOS only
    saveWithCurrentDate: true, // default is false, iOS only
    minimumBitrate: 300000,
    removeAudio: false, // default is false
  };

  const createPostHandle = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (imageArray.length > 0) {
      for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].split('.')[1] !== 'mp4') {
          formData.append('file', {
            name: 'image',
            type: 'image/jpeg',
            uri: imageArray[i],
          });
        } else {
          await ProcessingManager.compress(imageArray[i], compressOptions).then(
            (data) => {
              formData.append('file', {
                name: 'video',
                type: 'video/mp4',
                uri: data.source,
              });
            },
          );
        }
      }
    }
    try {
      if (imageArray.length > 0) {
        const imageData: any = [];
        const postData = convertObjectHtml;
        await axios
          .post(options.httpLink.toString() + 'api/upload', formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then(async (response) => {
            const location = response.data.location;
            for (let i = 0; i < imageArray.length; i++) {
              imageData.push({key: imageArray[i], value: location[i]});
            }
            for (let i = 0; i < imageData.length; i++) {
              const index = postData.findIndex(
                (item) => item.url === imageData[i].key,
              );
              if (postData[index].url.split('.')[1] === 'mp4') {
                postData[index].url = `${imageData[i].value}checkVideo`;
              } else {
                postData[index].url = imageData[i].value;
              }
            }
            await createPostMutation({
              variables: {
                petType: pickAnimalType,
                title: value,
                text: convertToHtmlString(postData),
              },
            });
          });
      } else {
        await createPostMutation({
          variables: {
            petType: pickAnimalType,
            title: value,
            text: html,
          },
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      goBack();
    }
  };

  const PickAnimal = ({animal}) => {
    return (
      <TouchableWithoutFeedback onPress={() => setPickAnimalType(animal)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          {pickAnimalType === animal ? (
            <MaterialCommunityIcons
              name={'check-box-outline'}
              size={20}
              color={'black'}
            />
          ) : (
            <MaterialCommunityIcons
              name={'checkbox-blank-outline'}
              size={20}
              color={'black'}
            />
          )}
          <Text style={{textAlign: 'center', marginLeft: 10}}>{animal}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const canclePickAnimalType = () => {
    setPickAnimalTypeModal(!pickAnimalTypeModal);
    setPickAnimalType('강아지');
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <MaterialCommunityIcons
            name={'chevron-left'}
            size={40}
            color={cStyles.LightBlackColor}
          />
          <Text style={{fontSize: 20}}>새글쓰기</Text>
        </View>
        <TouchableOpacity onPress={() => createPostHandle()}>
          <View style={{paddingRight: 20}}>
            <Text style={{fontSize: 20}}>완료</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={{paddingLeft: 10}}>궁금한 펫종류</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setPickAnimalTypeModal(!pickAnimalTypeModal);
          }}>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 10,
            }}>
            {pickAnimalType}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={'제목'}
          placeholderTextColor={'black'}
          style={styles.textInput}
        />
      </View>
      <Modal isVisible={pickAnimalTypeModal}>
        <View style={styles.modal}>
          <View style={styles.fullScreenModal}>
            <View style={styles.wrapperModal}>
              <View style={styles.wrapperText}>
                <Text style={{textAlign: 'center'}}>
                  궁금증 해결이 필요한 펫을 선택해 주세요.
                </Text>
                <View style={{marginTop: 10}}>
                  <PickAnimal animal={'강아지'} />
                  <PickAnimal animal={'고양이'} />
                </View>
              </View>
              <View style={styles.wrapperButton}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    canclePickAnimalType();
                  }}>
                  <View style={styles.confirmNoButton}>
                    <Text>취소</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setPickAnimalTypeModal(!pickAnimalTypeModal)}>
                  <View style={styles.confirmYesButton}>
                    <Text>선택완료</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            height: constant.height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          {/* <Text
          style={{
            fontWeight: '700',
            // transform: [{scaleY: -1}],
            fontSize: 15,
            marginBottom: 50,
            color: 'black',
          }}>
          채팅방에 입장 중입니다
        </Text> */}

          <LoadingDots
            dots={4}
            colors={[
              cStyles.SwiperActiveColor,
              cStyles.SwiperDeactiveColor,
              cStyles.TabActiveColor,
              cStyles.TabDeactiveColor,
              // styles.darkGreyColor,
              // styles.darkGreyColor,
              // styles.darkGreyColor,
              // styles.darkGreyColor,
            ]}
            size={15}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  headerWrapper: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: constant.width / 1.01,
    height: 50,
    padding: 10,
    fontSize: 20,
    marginTop: 30,
    color: 'black',
    borderBottomColor: cStyles.BorderLightGrayColor,
    borderBottomWidth: 1,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: constant.width / 1.3,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperText: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  wrapperButton: {
    width: constant.width / 1.3,
    flexDirection: 'row',
  },
  confirmNoButton: {
    width: constant.width / 1.3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: cStyles.BorderLightGrayColor,
    borderRightWidth: 1,
    borderRightColor: cStyles.BorderLightGrayColor,
  },
  confirmYesButton: {
    width: constant.width / 1.3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: cStyles.BorderLightGrayColor,
  },
});

export default CreatePostHandle;
