import styles from './App.module.css';
import {useState} from 'react';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem';
import {levels, calculateIMC, Level} from './helpers/imc';

const App = () =>{
  const [altura, setAltura] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | undefined>(undefined);

  const handelCalculateButton = () =>{
    altura && peso ? setToShow(calculateIMC(altura, peso)) : alert('digite todos os campos')
  }
  const handelBackButton = () =>{
    setToShow(undefined)
    setAltura(0)
    setPeso(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mudial de Saúde para Calcular o peso ideal de cada pessoa.</p>

          <input name="altura" type="number" placeholder="digite a sua algura em metros" value={altura > 0 ? altura : ''} onChange={e => setAltura(e.target.valueAsNumber)} disabled={toShow ? true : false} />

          <input name="peso" type="number" placeholder="digite seu peso em kg" value={peso > 0 ? peso : ''} onChange={e => setPeso(e.target.valueAsNumber)} disabled={toShow ? true : false} />

          <button onClick={handelCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, i) =>(
                <GridItem key={i} item={item} />
              ))}
            </div>
          }
          {toShow !== undefined && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25} onClick={handelBackButton}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;