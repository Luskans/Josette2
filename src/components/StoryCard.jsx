import storyThumbnail from '../assets/story_thumbnail2.webp';
import styled from 'styled-components';
import localDate from '../utils/formatDate';
import readingTime from '../utils/getReadingTime';
import { Link } from 'react-router-dom';


export default function StoryCard({ story }) {
  return (
    // SANS IMAGE
    <article className="p-6 flex flex-col justify-between bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-between mb-5 text-gray-500">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          <svg
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          Tutorial
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{readingTime(story.content.length)}</span>
      </div>
      <h2 className="mb-2 text-xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
        <Link to={`/story/${story.id}`}>{story.title}</Link>
      </h2>
      <p className="mb-5 text-sm line-clamp-7 font-light text-gray-500 dark:text-gray-400">
        {story.synopsis}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to={`/user/${story.user.id}`}>
            <img
              className="w-10 h-10 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="Jese Leos avatar"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/user/${story.user.id}`}>
              <span className="font-medium line-clamp-1 dark:text-white">{story.user.name}</span>
            </Link>
            <span className="font-light text-sm text-gray-500 dark:text-gray-400">{localDate(story.createdAt)}</span>
          </div>
        </div>
        <a
          href="#"
          className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Plus
          <svg
            className="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </article>

    // AVEC IMAGE COTé
    // <div class="flex justify-between bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <div class="w-full flex flex-col justify-between m-5 pr-5 border-r">
    //     <div class="flex justify-between items-center mb-5 text-gray-500">
    //       <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
    //         <svg
    //           class="mr-1 w-3 h-3"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
    //         </svg>
    //         Tutorial
    //       </span>
    //       <span class="text-sm">{readingTime(story.content.length)}</span>
    //     </div>
    //     <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //       <a href="#">{story.title}</a>
    //     </h2>
    //     <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
    //       {story.synopsis}
    //     </p>
    //     <div class="flex justify-between items-center">
    //       <div class="flex items-center space-x-4">
    //         <img
    //           class="w-10 h-10 rounded-full"
    //           src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
    //           alt="Jese Leos avatar"
    //         />
    //         <div class="flex flex-col">
    //           <span class="font-medium dark:text-white">{story.user.name}</span>
    //           <span class="font-light text-sm text-gray-500 dark:text-gray-400">
    //             {localDate(story.createdAt)}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="flex flex-col justify-between gap-2">
    //     <a href="#" class="self-start">
    //         <img class="w-full rounded-lg sm:rounded-none sm:rounded-tr-lg" src={storyThumbnail} alt="Bonnie Avatar" />
    //     </a>
    //     <div>
    //         <p class="font-light text-sm text-gray-500 dark:text-gray-400">Vues</p>
    //     </div>
    //     <div>
    //         <p class="font-light text-sm text-gray-500 dark:text-gray-400">Likes</p>
    //     </div>
    //     <div>
    //         <p class="font-light text-sm text-gray-500 dark:text-gray-400">Comments</p>
    //     </div>
    //     <a
    //         href="#"
    //         class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline pb-5"
    //       >
    //         Read more
    //         <svg
    //           class="ml-2 w-4 h-4"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fill-rule="evenodd"
    //             d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
    //             clip-rule="evenodd"
    //           ></path>
    //         </svg>
    //       </a>
    //     </div>
    // </div>

    // CHAKRA
    // <ArticleContainer>
    //     <BodyCard>
    //         <BodyImage src={storyThumbnail} />
    //         <BodyText>
    //             <h3>{story.title}</h3>
    //             <p>{story.synopsis}</p>
    //             <p>{story.user.name}</p>
    //         </BodyText>
    //     </BodyCard>
    //     <FooterCard>
    //         <FooterInfos>
    //             <p>date</p>
    //             <p>x min read</p>
    //         </FooterInfos>
    //         <FooterThemes>
    //             <p>horreur</p>
    //             <p>fantasy</p>
    //         </FooterThemes>
    //     </FooterCard>
    //     <FollowDiv></FollowDiv>
    // </ArticleContainer>

    // <ArticleContainer>
    //     <Card
    //     direction={{ base: 'column', sm: 'row' }}
    //     overflow="hidden"
    //     variant="outline"
    //     >
    //         <Image
    //             objectFit="cover"
    //             maxW={{ base: '100%', sm: '200px' }}
    //             src={storyThumbnail}
    //             alt="A feather pen"
    //         />

    //         <Stack>
    //             <CardBody>
    //                 <Heading size="md">The perfect latte</Heading>

    //                 <Text py="2">
    //                     Caffè latte is a coffee beverage of Italian origin made with
    //                     espresso and steamed milk.
    //                 </Text>
    //             </CardBody>

    //             <CardFooter>
    //                 <Button variant="solid" colorScheme="blue">
    //                     Buy Latte
    //                 </Button>
    //             </CardFooter>
    //         </Stack>
    //     </Card>
    // </ArticleContainer>
  );
}
