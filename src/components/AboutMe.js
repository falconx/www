import React from 'react';
import styled from 'styled-components';

import VisuallyHidden from './VisuallyHidden';
import { DesktopOnly, MobileOnly } from './Media';

import me from '../images/me.svg';

// Todo: Obtain from CMS
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

// Todo: Obtain from CMS
const interests = [
  'Video Games',
  'Board Games',
  'Psychology',
  'Bouldering',
  'Nutrition',
  'Bodybuilding',
];

const S = {};

S.Column = styled.div`
  margin: 0 auto;

  @media screen and (min-width: 769px) {
    max-width: 600px;
  }
`;

S.About = styled(S.Column)`
  h2,
  h3,
  h4 {
    color: #fff;
  }

  @media screen and (min-width: 769px) {
    grid-column: 1 / span 3;
    max-width: none;
  }
`;

S.AboutHeader = styled.div`
  position: relative;
  text-align: center;
  margin: 30px 0;

  /* clear float */
  overflow: hidden;

  @media screen and (min-width: 769px) {
    &::after {
      content: '';
      position: absolute;
      top: 150px;
      left: 0;
      display: block;
      height: 75px;
      width: 100%;
      background-color: rgba(255, 255, 255, .1);
      clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 50px), 0% 100%);
    }
  }
`;

S.AboutContent = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, minmax(auto, 850px));
  grid-template-areas:
    'introduction introduction'
    'experience experience'
    'skills skills'
    'interests interests'
    'education education';
  grid-gap: 30px 60px;
  max-width: 1920px;

  @media screen and (min-width: 769px) {
    grid-template-areas:
      'introduction experience'
      'skills interests'
      'education education';
  }
`;

S.Content = styled.div`
  grid-area: introduction;

  p + * {
    margin-top: 1em;
  }
`;

S.Date = styled.div``;

S.ExperienceContent = styled(S.Content)`
  clear: both;
`;

S.Experience = styled.div`
  grid-area: experience;

  li {
    margin-bottom: 20px;
  }

  li + li::before {
    content: '';
    display: block;
    margin: 20px auto;
    height: 3px;
    width: 10%;
    background-color: rgba(255, 255, 255, .1);
  }

  h4 {
    float: left;
  }

  ${S.Date} {
    float: right;
    color: #e677ad; 
  }
`;

S.Interests = styled.div`
  grid-area: interests;
`;

S.Skills = styled.div`
  grid-area: skills;
`;

S.Education = styled.div`
  grid-area: education;
  overflow-x: auto;
  margin: 0 -20px;
  padding: 0 20px;

  /* remain scrollable but hide the scrollbar */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media screen and (min-width: 769px) {
    margin-left: -40px;
    margin-right: -40px;
    padding-left: 40px;
    padding-right: 40px;
  }
`

S.EducationContent = styled.div`
  line-height: 1.25;
`;

S.Timeline = styled.ol`
  position: relative;
  display: flex;
  margin: 120px 0 20px;
  text-align: center;

  > li {
    position: relative;
    flex: 1;
    min-width: 400px;
  }

  > li::before {
    content: '';
    display: block;
    position: absolute;
    height: 10px;
    width: calc(100% + 40px);
    margin-top: -30px;
    background-color: #e677ad;
  }

  > li::after {
    content: '';
    position: absolute;
    top: -35px; /* -30px - ((20px - 10px) / 2) */
    left: 0;
    right: 0;
    margin: auto;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #fff;
  }

  > li + li {
    margin-left: 40px;
  }

  ${S.Date} {
    position: absolute;
    top: -100px;
    width: 100%;
    text-align: center;
    color: #e677ad;
  }
`;

S.Interest = styled.li`
  white-space: nowrap;
`;

S.Photo = styled.img.attrs({
  src: me,
  alt: '',
})`
  position: relative;
  z-index: 1;
  width: 300px;
  max-width: 75%;
`;

S.SkillList = styled.ul`
  margin: 0 -5px;

  @media screen and (min-width: 769px) {
    margin-left: -10px;
    margin-right: -10px;
  }
`;

S.Skill = styled.div`
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border: 4px solid #e677ad;
  border-radius: 50px;
  line-height: 1;
  color: #e677ad;

  @media screen and (min-width: 769px) {
    margin: 10px;
  }
`;

S.MobilePhoto = styled.div`
  width: 250px;
  height: 250px;
  float: right;
  background-image: url('${me}');
  background-size: cover;
  clip-path: circle(50% at 90%);
  background-position: 100px 0;
  shape-outside: circle(50% at 90%) border-box;
  shape-margin: 10px;
  margin-top: 40px;
  margin-right: -20px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const AboutMe = props => (
  <React.Fragment>
    <DesktopOnly>
      <S.Column>
        <p>I'm passionate about creating beautiful user interfaces which rigorously conform to
        <em> web standards</em> whilst being <em>responsive</em> and <em>accessible</em>.</p>
      </S.Column>
    </DesktopOnly>

    <S.About>
      <MobileOnly>
        <S.MobilePhoto />

        <S.Content>
          <p>I'm passionate about creating beautiful user interfaces which rigorously conform to
          <em> web standards</em> whilst being <em>responsive</em> and <em>accessible</em>.</p>

          <div>
            <VisuallyHidden>
              <h3>Introduction</h3>
            </VisuallyHidden>
          </div>

          <p>Hi, I'm Matt. I studied computer science and games programming and have been a web
          developer now for more than ten years. Things have changed a lot since I first started
          and the web platform is moving faster than ever! I've always been excited about what
          could be achieved and seeing my own ideas go from design to code. I spent a lot of my
          youth turning designs into <i>pixel perfect</i> html and CSS and even, needlessly, writing
          PHP and MySQL based content management systems from scratch. This was all great practice
          and taught me a lot but these days I'm able to focus my energy on conforming to
          accessibility standards, semantics, and building robust, cross browser, user interfaces.
          I love nerding out about best practices and putting myself in the shoes of users who
          rely on assistive technologies to browse the web.</p>

          <p>The collection of work you find here is by no means comprehensive and merely provides
          a snapshot of what I've accomplished. I've worked on both social good and corporate
          projects (including the ninth-largest commercial airline in the US). I also freelance,
          so get in touch if you have a project or an idea you'd like me to work on.</p>
        </S.Content>
      </MobileOnly>

      <DesktopOnly>
        <S.AboutHeader>
          <S.Photo />
        </S.AboutHeader>
      </DesktopOnly>

      <S.AboutContent>
        <DesktopOnly>
          <S.Content>
            <VisuallyHidden>
              <h3>Introduction</h3>
            </VisuallyHidden>

            <p>Hi, I'm Matt. I studied computer science and games programming and have been a web
            developer now for more than ten years. Things have changed a lot since I first started
            and the web platform is moving faster than ever! I've always been excited about what
            could be achieved and seeing my own ideas go from design to code. I spent a lot of my
            youth turning designs into <i>pixel perfect</i> html and CSS and even, needlessly, writing
            PHP and MySQL based content management systems from scratch. This was all great practice
            and taught me a lot but these days I'm able to focus my energy on conforming to
            accessibility standards, semantics, and building robust, cross browser, user interfaces.
            I love nerding out about best practices and putting myself in the shoes of users who
            rely on assistive technologies to browse the web.</p>

            <p>The collection of work you find here is by no means comprehensive and merely provides
            a snapshot of what I've accomplished. I've worked on both social good and corporate
            projects (including the ninth-largest commercial airline in the US). I also freelance,
            so get in touch if you have a project or an idea you'd like me to work on.</p>
          </S.Content>
        </DesktopOnly>

        <S.Experience>
          <h3>Work &amp; Experience</h3>

          <ol>
            <li>
              <h4>Neontribe</h4>
              <S.Date>June 2013 &mdash; Current</S.Date>
              <S.ExperienceContent>
                <p>Web Engineer</p>
              </S.ExperienceContent>
            </li>
            <li>
              <h4>Neontribe</h4>
              <S.Date>Sept 2012</S.Date>
              <S.ExperienceContent>
                <p>University placement year</p>
              </S.ExperienceContent>
            </li>
            <li>
              <h4>Banana Link</h4>
              <S.Date>Dec 2008</S.Date>
              <S.ExperienceContent>
                <p>Programming tasks orientated around website development. Repeatedly went back on a voluntary basis</p>
              </S.ExperienceContent>
            </li>
            <li>
              <h4>L J Technical Systems Ltd</h4>
              <S.Date>Nov 2005</S.Date>
              <S.ExperienceContent>
                <p>Electronics Assistant - Two weeks assisting in assembly of electronic models including switches, connectors, circuit boards and general engineering operations</p>
              </S.ExperienceContent>
            </li>
          </ol>
        </S.Experience>

        <S.Skills>
          <h3>Software Skills</h3>

          <S.SkillList>
            {skills.map((skill, i) => (
              <S.Skill key={i}>{skill}</S.Skill>
            ))}
          </S.SkillList>
        </S.Skills>

        <S.Interests>
          <h3>Hobbies &amp; Interests</h3>

          <ul>
            {interests.map((interest, i) => (
              <S.Interest key={i}>
                <S.Content children={interest} />
              </S.Interest>
            ))}
          </ul>
        </S.Interests>

        <S.Education>
          <h3>Education</h3>

          <S.Timeline>
            <li>
              <h4>Long Stratton High School</h4>
              <S.Date>Sept 2001 &mdash; June 2006</S.Date>
              <S.EducationContent>
                <p>GCSE English (C), English Lit (B), Art (A), Maths (C)</p>
              </S.EducationContent>
            </li>
            <li>
              <h4>Norwich City College</h4>
              <S.Date>Sept 2006 &mdash; June 2008</S.Date>
              <S.EducationContent>
                <p>BTEC ND IT Practitioners &mdash; Awarded a triple distinction and Norfolk county scholar</p>
              </S.EducationContent>
            </li>
            <li>
              <h4>University of Derby</h4>
              <S.Date>Sept 2008 &mdash; Dec 2009</S.Date>
              <S.EducationContent>
                <p>BSc Computers Games Programming</p>
              </S.EducationContent>
            </li>
            <li>
              <h4>University of Derby</h4>
              <S.Date>Sept 2010 &mdash; May 2013</S.Date>
              <S.EducationContent>
                <p>BSc Computer Science &mdash; Awarded 2:1</p>
              </S.EducationContent>
            </li>
          </S.Timeline>
        </S.Education>
      </S.AboutContent>
    </S.About>
  </React.Fragment>
);

export default AboutMe;