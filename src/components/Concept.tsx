import { useCallback } from 'react';
import { Graphics as PixiGraphics, TextStyle } from 'pixi.js';
import { Graphics, Container, Text } from '@pixi/react';

interface ConceptProps {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color?: number;
}

export default function Concept(props: ConceptProps) {

    const draw = useCallback(
        (g: PixiGraphics) => {
            g.clear();
            g.beginFill(0x99ccff);
            g.drawRect(props.x, props.y, props.width, props.height);
            g.endFill();
        },
        [props],
    );

    return (
        <Container x={100} y={100}>
            <Graphics draw={draw} />
            <Text
                text={props.text}
                anchor={-0.2}
                x={props.x}
                y={props.y}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: '0xffffff',
                        fontSize: '30px',
                        fontFamily: 'Agave Nerd Font Mono',
                        dropShadow: true,
                        dropShadowColor: '#444444',
                        dropShadowDistance: 4,
                    })
                }
            />
        </Container>
    );
}