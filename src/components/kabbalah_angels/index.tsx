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
                // Update text content for elements with specific IDs
                    console.log(`🚀 ~ index.tsx:57 ~ angels.forEach ~ angels:`, angels)
                angels.forEach(({ sephira, angel }) => {
                    const elementId = `title_sefira_${sephira}`;
                    const textElement = svgDoc.getElementById(elementId);
                    if (textElement) {
                        textElement.textContent = angel ?? '';
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
            data="./assets/images/kabbalah.svg"
            type="image/svg+xml" 
            width="100%"
            height="100%"
        >
            Seu navegador não suporta SVG
        </object>
    );



}