import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, trophyOutline, peopleOutline, statsChartOutline, gameController } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/custom.css';

/* Pages */
import Home from './pages/Home';
import Game from './pages/Game';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {/* Menu latéral */}
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem routerLink="/home" routerDirection="none" lines="none">
                  <IonIcon slot="start" icon={homeOutline} />
                  <IonLabel>Accueil</IonLabel>
                </IonItem>
                <IonItem routerLink="/game" routerDirection="none" lines="none">
                  <IonIcon slot="start" icon={gameController} />
                  <IonLabel>Jouer</IonLabel>
                </IonItem>
                <IonItem routerLink="/classement" routerDirection="none" lines="none">
                  <IonIcon slot="start" icon={trophyOutline} />
                  <IonLabel>Classement</IonLabel>
                </IonItem>
                <IonItem routerLink="/multijoueur" routerDirection="none" lines="none">
                  <IonIcon slot="start" icon={peopleOutline} />
                  <IonLabel>Multijoueur</IonLabel>
                </IonItem>
                <IonItem routerLink="/statistiques" routerDirection="none" lines="none">
                  <IonIcon slot="start" icon={statsChartOutline} />
                  <IonLabel>Statistiques</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonMenu>

          {/* Contenu principal */}
          <IonRouterOutlet id="main">
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
