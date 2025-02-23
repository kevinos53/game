import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { gameController, trophy, people, statsChart } from 'ionicons/icons';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout title="Marina Game">
      <div className="hero-section ion-padding">
        <h1 className="ion-text-center">Bienvenue sur Marina Game</h1>
        <p className="ion-text-center">
          Découvrez une nouvelle façon de jouer et de vous divertir
        </p>
      </div>

      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={gameController} size="large" color="primary" />
                <IonCardTitle>Jouer maintenant</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Commencez une nouvelle partie et relevez de nouveaux défis !
                <div className="ion-text-center ion-padding-top">
                  <IonButton expand="block" routerLink="/game">
                    Démarrer
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={trophy} size="large" color="warning" />
                <IonCardTitle>Classement</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Consultez le classement des meilleurs joueurs et votre position.
                <div className="ion-text-center ion-padding-top">
                  <IonButton expand="block" color="warning">
                    Voir le classement
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={people} size="large" color="secondary" />
                <IonCardTitle>Multijoueur</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Jouez avec vos amis et créez des parties multijoueurs.
                <div className="ion-text-center ion-padding-top">
                  <IonButton expand="block" color="secondary">
                    Mode multijoueur
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={statsChart} size="large" color="tertiary" />
                <IonCardTitle>Statistiques</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Suivez vos performances et votre progression.
                <div className="ion-text-center ion-padding-top">
                  <IonButton expand="block" color="tertiary">
                    Mes stats
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  );
};

export default Home; 