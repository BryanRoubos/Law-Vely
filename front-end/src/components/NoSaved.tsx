import { Link } from 'react-router-dom';
import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react';

export const NoSaved: React.FC = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+1%3DFolder_+Property+2%3DLg.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">No Tracked Legislations</EmptyTitle>
      <EmptyDescription className="mb-8">
        It appears you have no legislations saved to your account yet. Please browse for legislations you like, press the track button and return here to view them later.
      </EmptyDescription>
      <Link to="/" className={buttonVariants({ color: 'primary' })}>
        Go to Home
      </Link>
    </Empty>
  );
};

export default NoSaved;