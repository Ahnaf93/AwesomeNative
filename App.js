import {
  AsyncStorage,
  ActivityIndicator,
  StatusBar,Button, 
  View, Text,
  Platform,StyleSheet,
  TouchableOpacity,
  TextInput 
}from 'react-native';

import * as React from 'react';

import { 
  createAppContainer,
  createSwitchNavigator,

} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack'

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});




const userInfo={username:'Tulon', password:'1993'}

class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
      };
    }
    handleUsername = text => {
      this.setState({ username: text });
    };
    handlePassword = text => {
      this.setState({ password: text });
    };



    
login = (email, pass) => {
  this.props.navigation.navigate('Details')

}


  render() {
    return (



      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="username"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={(username)=>this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={(password)=>this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          //onPress={() => this.login(this.state.email, this.state.password)}
        

          onPress={this._login}
        
        
        
        >
          <Text style={styles.submitButtonText}> Login </Text>
        </TouchableOpacity>
      </View>

      
    );
  }

  _login=async()=>{
    if(userInfo.username===this.state.username && userInfo.password===this.state.password){
      //alert('logged in successfully');

      await AsyncStorage.setItem('isLoggedIn', '1');
       this.props.navigation.navigate('Details');

    }else{
      alert('username or password is incorrect.');
    }
  }



}

class DetailsScreen extends React.Component {
  static navigationOptions={
    title : 'AwesomeNative',
    headerRight: <View/>
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          // title="Go to Details... again"
          // onPress={() => this.props.navigation.push('Details')}

          title="Home Page"
          onPress={()=> this.logout(this.state.email, this.state.password)}
        />
        <Button
          title="List Of Books Read"
          onPress={()=> this.logout(this.state.email, this.state.password)}
        />
        
        <Button
          title="Settings"
          onPress={()=> this.logout(this.state.email, this.state.password)}
        />
      
        <Button
          title="Logout"
          onPress={()=> this.props.navigation.navigate('Home')}
        />
        
 

      </View>
    );
  }
  _logout=async()=>{
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

const RootStack = createStackNavigator({
  
  //Home: HomeScreen,
  Details: DetailsScreen,
});


const AuthStack=createStackNavigator({Home:HomeScreen});

class AuthLoadingScreen extends React.Component{
  constructor(props){
    super(props);
    this._loadData();
  }

  render(){
    return(<
      View style={styles.container}>
      
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }

  _loadData=async()=>{
    const isLoggedIn=await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !=='1'? 'Auth': 'App');
  }
}





//export default createAppContainer(RootStack);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading:AuthLoadingScreen,
    App:RootStack,
    Auth:AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }

))