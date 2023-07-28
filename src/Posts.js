import { Button } from "@material-tailwind/react";
import { getPosts } from "./Firebase";
import { Link } from "react-router-dom";


const posts = [
  {
    heading: "Celebrity New years Cruise Celebration",
    summary:
      "JOin us on a fabulous cruise to Mexico this new years on Celebrity Fireworx",
    body: "asdkfjkr8i lasdkfjhuiryt rif iikijdjneryutgnv drityhfieosjfh",
    featureIMG:
      "https://images.unsplash.com/photo-1601681673640-930d30cd64ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNydWlzZSUyMHNoaXAlMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    sections: [
      {
        type: "Book before September 1 and reeieve in room dining for 2 - FREE",
        details:
          "aadksfj  ieu7eibviu ieujbnasdjj;losi ieruio ashoe iasuioasdjg ",
      },
    ],
    dates: [{ start: "11/09/2023", end: "11/15/2023", type: "sailing" }],
    extras: [
      {
        title: "Dining Promo",
        info: ["In room dining special for all suites 5 nights or more"],
      },
    ],
  },
];


function Posts({posts}) {

  console.log(posts)

  const getPost = (id) => {
    console.log(id)
  }

  const renderPosts = () => {
    return posts.map( (container, i) => {
      const id = container.id;
      const post = container.post;
      return <div key={id} className="my-1 duration-300 bg-blue-900 border-2 border-gray-800 rounded shadow-sm shadow-gray-500 border-spacing-10 dark:shadow-gray-900 hover:-translate-y-1">
      {/* <!-- Clickable Area --> */}
      <a _href="link" className="cursor-pointer">
        <figure className="">
          {/* <!-- Image --> */}
          <img
            // url={post.featureImage}
            alt={post.heading}
            src={post.featureIMG}
            className="object-cover w-full rounded-t h-72"
          />

          <figcaption className="p-4">
            {/* <!-- Title --> */}
            <p className="mb-4 text-lg font-bold leading-relaxed text-gray-500 dark:text-gray-300">
              {post.heading}
              {/* <!-- Post Title --> */}
            </p>

            {/* <!-- Description --> */}
            <small className="leading-5 text-gray-500 dark:text-gray-400">
              {post.summary}
              {/* <!-- Post Description --> */}
            </small>
          </figcaption>
        </figure>
      </a>
      <div className="relative p-4">
        <i className="text-xs text-gray-100 fa fa-star">
          
          {post.extras.length} | extras
        </i>
      </div>
      <Link to={`post/${id}`}className="m-4 text-white bg-gray-900"
      
      >
        Learn More
      </Link>
    </div>
    })
  }
  
  return (
    <>
      <section className="px-1 py-1 bg-gray-900 dark:bg-gray-900 ">
        {/* <!-- Card Grid --> */}
        <div className="grid grid-flow-row gap-2 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {renderPosts()}
        </div>
      </section>
    </>
  );
}
export default Posts;
