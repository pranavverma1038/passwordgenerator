import { StyleSheet, Text, View,ImageSourcePropType,Image, Touchable, TouchableOpacity} from 'react-native'
import React,{PropsWithChildren, useState} from 'react'
import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'

type DiceProps = PropsWithChildren<{
  imageUrl:ImageSourcePropType,
}>

const Dice = ({imageUrl}:DiceProps)=>{
  return (
    <View>
        <Image style={styles.diceImage} source={imageUrl}/>
    </View>
  )
}

export default function App() {

  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne)
  const [number,setNumber]= useState('one');
  

  const rollDice = () => {
    let num = Math.floor(Math.random()*6)+1;
    
    switch(num){
    case 1:
      setDiceImage(DiceOne)
      setNumber('One')
      break;
    case 2:
      setDiceImage(DiceTwo)
      setNumber('Two')
      break;
    case 3:
      setDiceImage(DiceThree)
      setNumber('Three')
      break;
    case 4:
      setDiceImage(DiceFour)
      setNumber('Four')
      break;
    case 5:
      setDiceImage(DiceFive)
      setNumber('Five')
      break;
    case 6:
      setDiceImage(DiceSix)
      setNumber('Six')
      break;
    default:
      setDiceImage(DiceOne)
      setNumber('One')
      break;

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Roll The Dice 🎲</Text>
      <Dice imageUrl={diceImage}/>
      <TouchableOpacity
      onPress={rollDice}
      >
      <Text style={styles.numberText}>{number}</Text>
         <Text style={styles.rollDiceBtnText}>Roll the Dice</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  numberText: {
  fontSize: 35,
  fontWeight: 'bold',
  color: 'purple',
  textAlign: 'center',
  marginBottom:10
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})