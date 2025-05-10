import React, { useState, useEffect } from 'react';


interface KabbalahProps {
    onSephiraChange: (sephira: string) => void;
    handlePathChange: (path: string) => void;
}

export default function Kabbalah({ onSephiraChange, handlePathChange }: KabbalahProps) {


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

    const groupPath: Record<string, string> = {
        caminho_0: "louco",
        caminho_1: "mago",
        caminho_2: "sacerdotisa",
        caminho_3: "imperatriz",
        caminho_4: "imperador",
        caminho_5: "hierofante",
        caminho_6: "enamorados",
        caminho_7: "carro",
        caminho_8: "forca",
        caminho_9: "eremita",
        caminho_10: "roda",
        caminho_11: "justica",
        caminho_12: "pendurado",
        caminho_13: "morte",
        caminho_14: "temperanca",
        caminho_15: "diabo",
        caminho_16: "torre",
        caminho_17: "estrela",
        caminho_18: "lua",
        caminho_19: "sol",
        caminho_20: "julgamento",
        caminho_21: "mundo",
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
                    if (suffix && groupId.endsWith(`${suffix}`)) {
                        newSephira = value;
                        break;
                    }
                }
            }
            if (newSephira) {
                handlePathChange('');
                onSephiraChange(newSephira);
            }

            let newPath = groupPath[groupId];
            if (!newPath) {
                for (const [key, value] of Object.entries(groupPath)) {
                    const suffix = key;
                    if (suffix && groupId.endsWith(`${suffix}`)) {
                        newPath = value;
                        break;
                    }
                }
            }
            if (newPath) {
                onSephiraChange('');
                handlePathChange(newPath);
            }
        };

        // Se o SVG carregado internamente pelo object permitir, você pode buscar seu conteúdo
        const objectElement = document.getElementById('kabbalah-svg-object');
        objectElement?.addEventListener('load', () => {
            const svgDoc = (objectElement as HTMLObjectElement).contentDocument;
            if (svgDoc) {
                svgDoc.addEventListener('click', handleGroupClick);
            }
        });

        return () => {
            const objectEl = document.getElementById('kabbalah-svg-object');
            const svgDoc = (objectEl as HTMLObjectElement)?.contentDocument;
            svgDoc?.removeEventListener('click', handleGroupClick);
        };
    }, []);

    return (
        <object
            id="kabbalah-svg-object"
            data={`${process.env.PUBLIC_URL}/assets/images/kabbalah.svg`}
            type="image/svg+xml" 
            width="100%"
            height="100%"
        >
            Seu navegador não suporta SVG
        </object>
    );
}