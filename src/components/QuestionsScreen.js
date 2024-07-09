import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const QuestionsScreen = ({route}) => {
  const { item } = route.params;
  console.log(item);
  return (
    <ImageBackground
      source={require('../images/fullimage.jpg')}
      resizeMode="cover"
      style={styles.bg_full}>
      <View style={{paddingHorizontal: 25, marginBottom: 20, marginTop: 30}}>
        <Text style={[styles.heading2, {color: '#37E9BB'}]}>05/15</Text>
        <Text style={styles.heading1}>Where is the Taj Mahal located?</Text>
      </View>
      <Image
        source={require('../images/tajmahal.jpg')}
        style={{
          width: 304,
          height: 214,
          borderRadius: 10,
          borderWidth: 2,
          alignSelf: 'center',
          borderColor: '#ffff',
        }}
      />
      {/* Bullets */}
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <Image
            source={require('../images/num_01.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={[styles.heading2, {paddingLeft: 20}]}>
            London,United Kingdom
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <Image
            source={require('../images/num_01.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={[styles.heading2, {paddingLeft: 20}]}>
            London,United Kingdom
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <Image
            source={require('../images/num_01.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={[styles.heading2, {paddingLeft: 20}]}>
            London,United Kingdom
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <Image
            source={require('../images/num_01.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={[styles.heading2, {paddingLeft: 20}]}>
            London,United Kingdom
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={{position: 'absolute', bottom: 0,width:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity style={{}}>
            <Image source={require('../images/prev.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/next.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default QuestionsScreen;

const styles = StyleSheet.create({
  bg_full: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  displayHeading1: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  smallHeading: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading1: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Artegra Soft Light',
  },
  heading2: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  darkBtn: {
    width: 295,
    height: 68,
    backgroundColor: '#6949FE',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  headingBtn: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
  borderBtn: {
    width: 295,
    height: 68,
    borderColor: '#6949FE',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  borderText: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Artegra Soft Bold',
  },
});
