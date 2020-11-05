import React from 'react';
import {View, Image, Text} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';


interface TeacherItemProps{
    name:string;
}
const TeacherItem: React.FC<TeacherItemProps> = () =>{
    
    return (
    <View style={styles.container}>
       <View style={styles.profile}>
           <Image 
                style={styles.avatar}
                source={{uri: '' }}
           />
       
       <View style={styles.profileInfo}>
                <Text style={styles.name}>name</Text>
                <Text style={styles.subject}>subject</Text>
       </View>
       </View>
           <Text style={styles.bio}>
              nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
              {'\n'}{'\n'}
              nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
           </Text>
         
           <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'  '}
                    <Text style={styles.priceValue}>
                        R$ 20,00</Text>
                </Text>
           </View>
           <View style={styles.buttonsContainer}>
                <RectButton style={[styles.favoriteButton,styles.unFavorite]}>
                  {/*  <Image source={heartOutlineIcon} /> */}
                    <Image source={unfavoriteIcon} />
                </RectButton>
                <RectButton style={styles.contactButton}>
                <Image source={whatsAppIcon} />
                <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                </RectButton>
           </View>         
       
    </View>
    );
}

export default TeacherItem;