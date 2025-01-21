import { Link } from 'react-router-dom';
import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react';

export const NoResults: React.FC = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">Sorry, no result found!</EmptyTitle>
      <EmptyDescription className="mb-8">
        We are working hard on increasing our database, but if you can't find what you are looking for please visit <a href="http://legislation.gov.uk" className="underline">legislation.gov.uk</a> for the most recent legislation advice.
      </EmptyDescription>
      <Link to="/" className={buttonVariants({ color: 'primary' })}>
        Go to Home
      </Link>
    </Empty>
  );
};

export default NoResults;