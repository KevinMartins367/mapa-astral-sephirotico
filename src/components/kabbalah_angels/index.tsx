import React, { useState, useEffect } from 'react';

import GraphInfos from '../../interfaces/GraphInfos';

interface KabbalahProps {
    onSephiraChange: (sephira: string) => void;
    angels: GraphInfos[];
}

export default function Kabbalah_angels({ onSephiraChange, angels }: KabbalahProps) {
    
    const groupSephiroth: Record<string, string> = {
        malkut: "malkuth",
        yesod: "yesod",
        hod: "hod",
        netzach: "netzach",
        tipheret: "tipheret",
        geburah: "geburah",
        chesed: "chesed",
        binah: "binah",
        chokmah: "chokmah",
        kether: "kether",
        daath: "daath",
    };

    useEffect(() => {
        const handleGroupClick = (event: MouseEvent) => {
            const target = event.target as SVGElement;
            const groupId = target.id;
            if (!groupId) return;

            let newSephira = groupSephiroth[groupId];
            if (!newSephira) {
                for (const [key, value] of Object.entries(groupSephiroth)) {
                    const suffix = key;
                    if (groupId.endsWith(suffix)) {
                        newSephira = value;
                        break;
                    }
                }
            }

            if (newSephira) {
                onSephiraChange(newSephira);
            }
        };

        const objectElement = document.getElementById('kabbalah-svg-object');
        objectElement?.addEventListener('load', () => {
            const svgDoc = (objectElement as HTMLObjectElement).contentDocument;
            if (svgDoc) {
                svgDoc.getElementById('script5')?.remove();
                angels.forEach(({ sephira, angel }) => {
                    const elementId = `title_sefira_${sephira}`;
                    const textElement = svgDoc.getElementById(elementId);
                    if (textElement) {
                        textElement.textContent = angel.angel ?? '';
                        textElement.style.fill = '#f0f0f0';
                    }
                    
                    const cirleElement = svgDoc.getElementById(`circle_sefira_${sephira}`);
                    
                    if (cirleElement) {
                        cirleElement.style.fill = angel.color ?? '#f0f0f0';
                    }
                });

                svgDoc.addEventListener('click', handleGroupClick);
            }
        });

        return () => {
            const objectEl = document.getElementById('kabbalah-svg-object');
            const svgDoc = (objectEl as HTMLObjectElement)?.contentDocument;
            svgDoc?.removeEventListener('click', handleGroupClick);
        };
    }, [angels]);

    return (
        <object
            id="kabbalah-svg-object"
            data={`${process.env.PUBLIC_URL}/assets/images/kabbalah_angels.svg`}
            type="image/svg+xml" 
            width="100%"
            height="100%"
        >
            Seu navegador não suporta SVG
        </object>
    );



}