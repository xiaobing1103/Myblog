/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect, useState } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import BlogPostItem from "../BlogPostItem";
import BlogListPaginator from "@theme/BlogListPaginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faQq,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import useBaseUrl from "@docusaurus/useBaseUrl";
// import bilibiliIcon from "@site/static/icons/bilibili.svg";

import useThemeContext from "@theme/hooks/useThemeContext";
// import useFollowers from "./useFollowers";
// import useViews from "./useViews";
import { useTrail, animated, useSpring } from "react-spring";
import Fade from "react-reveal/Fade";

import ArrowDown from "@site/static/icons/arrow-down.svg";
import BilibiliIcon from "@site/static/icons/bilibili.svg";

function BlogListPage(props) {
  const { metadata, items } = props;

  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const isBlogOnlyMode = metadata.permalink === "/";
  const isPaginated = metadata.page > 1;
  const title = isBlogOnlyMode ? siteTitle : "Blog";
  const description = `不仅仅是前端工程师，分享React.js, HTML, CSS, JavaScript, Node.js 技术以及个人发展、自我提升相关的心得`;

  // Get all post views
  // const views = useViews(items);
  const views = [];
  // Get followers
  // const followers = useFollowers();
  const followers = 0;
  // animation
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: "translateY(3em)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
    // delay: 300,
  });
  const animatedHero = useSpring({
    opacity: 1,
    backgroundPositionX: "100%",
    from: { opacity: 0, backgroundPositionX: "200%" },
    config: { mass: 3, tension: 280, friction: 30 },
    // delay: 1200,
  });

  // const animatedBackground = useSpring({
  //   background: "linear-gradient(25deg, #1081ff, #72e1f6, #b185ff)",
  //   to: {
  //     background: "linear-gradient(375deg, #1081ff, #72e1f6, #b185ff)",
  //   },
  // });

  return (
    <Layout title={title} description={description}>
      {/* 个人简介 */}
      {!isPaginated && (
        <animated.div className="hero">
          <div className="bloghome__intro">
            <animated.h1 style={animatedTexts[0]}>
              Hello! <span className="intro__name">你好</span>
            </animated.h1>
            <animated.p style={animatedTexts[1]}>
              致力于将编程和艺术相结合，以直观、生动、有趣的方式呈现枯燥的编程概念和原理，助你以最快的速度、愉快的心情掌握编程技巧，进而提升工作竞争力和创新创业能力。
            </animated.p>
            <animated.p style={animatedTexts[3]}>
            欢迎来到二姨的博客
              {/* QQ 1 群：644722908，2 群：1004912565 */}
            </animated.p>
            <SocialLinks animatedProps={animatedTexts[4]} />
            <animated.div style={animatedTexts[2]}>
              <a
                href="#"
                className="bloghome__follow"
              >
                {/* 去B站关注 ({(Math.round(followers) / 10000).toFixed(1)} 万) */}
                正在建设中...
              </a>
            </animated.div>
          </div>

          {/* <div className="bloghome__image">
          <animated.img src="/img/hero_main.svg" style={animatedHero} />
        </div> */}
          {/* <animated.div
          className="bloghome__scroll-down"
          style={animatedBackground}
        >
          <button>
            <ArrowDown />
          </button>
        </animated.div> */}
        </animated.div>
      )}
      <div className="container margin-vert--sm">
        <div className="row">
          <div className="col col--12">
            {/* <div className="content__divider"></div> */}
            {!isPaginated && (
              <h1 className="blog__section_title">
                最新博客&nbsp;
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.8333 5.16666H5.16668C3.73293 5.16666 2.59626 6.31624 2.59626 7.74999L2.58334 23.25C2.58334 24.6837 3.73293 25.8333 5.16668 25.8333H25.8333C27.2671 25.8333 28.4167 24.6837 28.4167 23.25V7.74999C28.4167 6.31624 27.2671 5.16666 25.8333 5.16666ZM10.9792 19.375H9.42918L6.13543 14.8542V19.375H4.52084V11.625H6.13543L9.36459 16.1458V11.625H10.9792V19.375ZM17.4375 13.2525H14.2083V14.6992H17.4375V16.3267H14.2083V17.7604H17.4375V19.375H12.2708V11.625H17.4375V13.2525ZM26.4792 18.0833C26.4792 18.7937 25.8979 19.375 25.1875 19.375H20.0208C19.3104 19.375 18.7292 18.7937 18.7292 18.0833V11.625H20.3438V17.4504H21.8033V12.9037H23.4179V17.4375H24.8646V11.625H26.4792V18.0833Z"
                    fill="#4490D6"
                  />
                </svg>
              </h1>
            )}
            <div className="bloghome__posts">
              {items.map(({ content: BlogPostContent }) => (
                <Fade key={BlogPostContent.metadata.permalink}>
                  <BlogPostItem
                    key={BlogPostContent.metadata.permalink}
                    frontMatter={BlogPostContent.frontMatter}
                    metadata={BlogPostContent.metadata}
                    truncated={BlogPostContent.metadata.truncated}
                    views={
                      views.find(
                        (v) => v.slug == BlogPostContent.frontMatter.slug
                      )?.views
                    }
                  >
                    <BlogPostContent />
                  </BlogPostItem>
                </Fade>
              ))}
              <BlogListPaginator metadata={metadata} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SocialLinks({ animatedProps, ...props }) {
  // const { isDarkTheme } = useThemeContext();
  return (
    <animated.div className="social__links" style={animatedProps}>
      <a href="#">
        <BilibiliIcon />
      </a>
      <a href="#">
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
      <a href="https://github.com/xiaobing1103">
        <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
      <div className="dropdown dropdown--hoverable">
        <FontAwesomeIcon icon={faWeixin} size="lg" />
        {/* <img
          width="50%"
          className="dropdown__menu"
          src={useBaseUrl("/img/publicQR.png")}
        /> */}
      </div>
    </animated.div>
  );
}

export default BlogListPage;
