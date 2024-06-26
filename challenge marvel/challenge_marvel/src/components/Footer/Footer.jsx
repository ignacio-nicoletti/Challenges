import styles from './footer.module.css';
import linkedinIcon from '../../assets/linkedin.png';
import githubIcon from '../../assets/github.png';

const Footer = () => {
  return (
    <div className={styles.contain}>

      <p>Proyecto realizado por Nicoletti Ignacio</p>
      <div className={styles.social}>
        <a
          href="https://www.linkedin.com/in/ignacio-nicoletti/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinIcon} alt="Linkedin" />
        </a>
        <a
          href="https://github.com/ignacio-nicoletti/challengeMarvel"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>
      </div>

    </div>
  );
};

export default Footer;
