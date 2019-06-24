import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

import styles from './header.module.css';

import me from '../images/me.svg';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'PHP',
  'React',
  'Drupal',
  'WordPress',
  'Jekyll',
  'Gatsby',
  'C#',
  'Photoshop',
  'Illustrator',
];

const interests = [
  'Video Games',
  'Board Gaming',
  'Psychology',
  'Bouldering',
  'Nutrition',
  'Bodybuilding',
];

class Header extends Component {
  static propTypes = {
    /** Hides introduction text */
    simple: PropTypes.bool,
  };

  static defaultProps = {
    simple: false,
  };

  constructor(props) {
    super(props);

    this.toggleAboutMe = this.toggleAboutMe.bind(this);

    this.state = {
      showAboutMe: false,
    };
  }

  toggleAboutMe() {
    this.setState({
      showAboutMe: !this.state.showAboutMe,
    });
  }

  render() {
    return (
      <header className={styles.root}>
        <div className={[styles.column, styles.intro].join(' ')}>
          <h1 className={styles.title}>
            <Link to="/">Matt<br />Layton</Link>
          </h1>

          {!this.props.simple && (
            <p>Hey! I'm a <em>front-end web engineer</em> with more than 10 years experience.</p>
          )}
        </div>

        {!this.props.simple && (
          <React.Fragment>
            <div className={styles.column}>
              <p>I'm passionate about creating beatiful user interfaces which rigorously conform to
              <em> web standards</em> whilst being <em>responsive</em> and <em>accessible</em>.</p>
              <button
                onClick={this.toggleAboutMe}
                aria-controls="about"
                className={styles.aboutToggle}
              >Want to learn more about me?</button>
            </div>

            <div
              id="about"
              className={[styles.column, styles.about].join(' ')}
              aria-expanded={this.state.showAboutMe}
            >
              <AnimateHeight
                duration={500}
                height={this.state.showAboutMe ? 'auto' : 0}
              >
                <div className={styles.aboutHeader}>
                  {/* <div className={styles.photo} /> */}
                  <img className={styles.photo} src={me} alt="" />
                </div>

                <div className={styles.aboutContent}>
                  <div className={styles.introduction}>
                    <h3>Introduction</h3>
                    <p>Originally having a passion for fine art and*technical drawing, I transferr*ed my
                    creativity to the digital world where I was able to express my work using Photoshop,
                    HTML, and CSS.</p>
                    <p>Since then I have gained qualifications after finishing college and
                    university and find myself working with many front and back-end technologies
                    (far too many to list here).</p>
                    <p>Education has taught me to understand data structures,
                    networking, low-level programming languages including assembly and C++, as well as
                    higher level, object oriented technologies, including C# and the XNA framework.
                    Predominantly I now work with Drupal, Node, JavaScript, Sass, and - most recently -
                    React.</p>
                  </div>

                  <div className={styles.experience}>
                    <h3>Work &amp; Experience</h3>

                    <ol className={styles.experience}>
                      <li>
                        <h4>Neontribe</h4>
                        <div className={styles.date}>June 2013 &mdash; Current</div>
                        <div className={styles.content}>
                          <p>Web Engineer</p>
                        </div>
                      </li>
                      <li>
                        <h4>Neontribe</h4>
                        <div className={styles.date}>Sept 2012</div>
                        <div className={styles.content}>
                          <p>University placement year</p>
                        </div>
                      </li>
                      <li>
                        <h4>Banana Link</h4>
                        <div className={styles.date}>Dec 2008</div>
                        <div className={styles.content}>
                          <p>Programming tasks orientated around website development. Repeatedly went back on a voluntary basis</p>
                        </div>
                      </li>
                      <li>
                        <h4>L J Technical Systems Ltd</h4>
                        <div className={styles.date}>Nov 2005</div>
                        <div className={styles.content}>
                          <p>Electronics Assistant - Two weeks assisting in assembly of electronic models including switches, connectors, circuit boards and general engineering operations</p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className={styles.skills}>
                    <h3>Software Skills</h3>
                    <ul>
                      {skills.map((skill, i) => (
                        <li key={i} className={styles.skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.interests}>
                    <h3>Hobbies &amp; Interestes</h3>
                    <ul>
                      {interests.map((interest, i) => (
                        <li key={i} className={styles.interest}>{interest}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.education}>
                    <h3>Education</h3>

                    <ol className={styles.timeline}>
                      <li>
                        <h4>Long Stratton High School</h4>
                        <div className={styles.date}>Sept 2001 &mdash; June 2006</div>
                        <p>GCSE English (C), English Lit (B), Art (A), Maths (C)</p>
                      </li>
                      <li>
                        <h4>Norwich City College</h4>
                        <div className={styles.date}>Sept 2006 &mdash; June 2008</div>
                        <p>BTEC ND IT Practitioners &mdash; Awarded a triple distinction and Norfolk county scholar</p>
                      </li>
                      <li>
                        <h4>University of Derby</h4>
                        <div className={styles.date}>Sept 2008 &mdash; Dec 2009</div>
                        <p>BSc Computers Games Programming</p>
                      </li>
                      <li>
                        <h4>University of Derby</h4>
                        <div className={styles.date}>Sept 2010 &mdash; May 2013</div>
                        <p>BSc Computer Science &mdash; Awarded 2:1</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </React.Fragment>
        )}
      </header>
    );
  }
}

export default Header;
