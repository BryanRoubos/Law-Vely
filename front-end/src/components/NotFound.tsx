import React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react';

export const NotFound: React.FC = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/aa469681-b2d1-4384-a990-91906711a24d_Property+1%3DNight+sky_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">404: This page isn't available right now</EmptyTitle>
      <EmptyDescription className="mb-8">
        This could be because there is a typo in the URL or we're working on the back-end. Please try again later.
      </EmptyDescription>
      <Link to="/" className={buttonVariants({ color: 'primary' })}>
        Go to Home
      </Link>
    </Empty>
  );
};

export default NotFound;