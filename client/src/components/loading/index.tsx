import React from "react";
import { Card, CardBody } from 'reactstrap';
import CenterPiece from '../centerPiece';

export interface ILoadingProps{
  dotType?: string;
  children: React.ReactNode;
}

export const Loading: React.FunctionComponent<ILoadingProps> = props =>{
  const {children, dotType} = props; 

  return(
    <div className="text-center">
      <div className="stage">
        <div className={dotType} />
      </div>
      {children}
    </div>
  );
}

Loading.defaultProps = {
  dotType: 'dot-bricks'
};

export interface ILoadingComponentProps{
  card?: boolean;
  dotType?: string;
  children: React.ReactNode;
}

export const LoadingComponent: React.FunctionComponent<ILoadingComponentProps> = props =>{
  const {card, children, dotType} = props; 

  if (card)
    {
      return (
        <CenterPiece>
          <Card className="text-center">
            <CardBody>
              <Loading dotType={dotType}>
                              {children}
              </Loading>
            </CardBody>
          </Card>
          </CenterPiece>
        );
    }

    return (
        <div className="text-center">
            <div className="stage">
                <div className={dotType} />
            </div>
            {children}
        </div>
    );
}
LoadingComponent.defaultProps = {
  card: true,
  dotType: 'dot-rolling'
}

export default LoadingComponent;
