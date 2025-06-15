import { StyleSheet, Text, View,ScrollView,SafeAreaView, TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";



const passwordSchema = Yup.object().shape({
    passwordLength: Yup.number()
    .min(4,'Should be minimum of 4 characters')
    .max(30,'Shoud be maximum of 16 characters')
    .required('Length is required')
  })

export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [upperCase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

   const generatePasswordString = (passwordLength:number)=>{
        let characterList = '';
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const digitChars = '0123456789';
        const specialChars = '!@#$%^&*()_+';

        if(upperCase){
          characterList += upperCaseChars;
        }
        if(lowerCase){
          characterList += lowerCaseChars;
        }
        if(numbers){
           characterList += digitChars
        }
        if(symbols){
          characterList += specialChars;
        }

        const passwordResult = createPassword(characterList,passwordLength)

        setPassword(passwordResult)
        setIsPassGenerated(true)
   }

   const createPassword = (characters:string,passwordLength:number)=>{
        let result = ''
        for(let i=0; i<passwordLength ;i++){
          const characterIndex = Math.round(Math.random()*characters.length)
          result += characters.charAt(characterIndex)
        }
        return result
   }

   const resetPassword=()=>{
      setPassword('')
      setIsPassGenerated(false)
      setLowerCase(false)
      setUppercase(false)
      setNumbers(false)
      setSymbols(false)
  
   }


  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
            <Text style={styles.title}>
                Password Generator
            </Text>
            <Formik
       initialValues={{ passwordLength:''}}
        validationSchema={passwordSchema}
        onSubmit={values=>{
          console.log(values)
          generatePasswordString(Number(values.passwordLength))
        }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleReset,
         handleSubmit,
         /* and other goodies */
       }) => (
        <>
          <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password Length</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errorText}>{errors.passwordLength}</Text>
                )}
                
              </View>
              <TextInput style={styles.inputStyle}
                value = {values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                keyboardType='numeric'
                placeholder='Ex.8'
                >

                </TextInput>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Includes Lowercase</Text>
            <BouncyCheckbox
              useBuiltInState={false}
              isChecked={lowerCase}
              onPress={() => setLowerCase(!lowerCase)}
              fillColor="#29AB87"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Uppercase </Text>
            <BouncyCheckbox
              useBuiltInState={false}
              isChecked={upperCase}
              onPress={() => setUppercase(!upperCase)}
              fillColor="#FED85D"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckbox
              useBuiltInState={false}
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
              fillColor="#C9A0DC"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox
              useBuiltInState={false}
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
              fillColor="#FC80A5"
            />
          </View>
          <View style={styles.formActions}>
              <TouchableOpacity
              disabled={!isValid}
              style={styles.primaryBtn}
              onPress={handleSubmit}
              >
                <Text style={styles.primaryBtnTxt}>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={()=>handleReset()}
              >

                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
              </TouchableOpacity>
          </View>
        </>
       )}
            </Formik>
        </View>
        {isPassGenerated ? (
            <View style={[styles.card,styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>Long Press To Copy</Text>
              <Text 
              selectable = {true}
              style={styles.generatedPassword}>{password}</Text>
            </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap:10,
    paddingHorizontal: 10
  },
  inputColumn: {
    flexDirection: 'column',
    flex: 1
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
    marginTop: 4
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight: '700',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
   
  },
  cardElevated: {
    backgroundColor: 'lightgray',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})