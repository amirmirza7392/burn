import {StyleSheet, Text, View, StatusBar} from 'react-native';

const LogScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Log Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogScreen;
