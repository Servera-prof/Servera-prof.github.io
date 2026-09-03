#!/bin/bash

# Demanar la carpeta d'origen (amb valor per defecte)
read -p "Introdueix la carpeta d'origen [Defecte: /home/joan/Documents/tanda]: " ORIGEN
if [ -z "$ORIGEN" ]; then
    ORIGEN="/home/joan/Documents/tanda"
fi

# Comprovar si la carpeta d'origen existeix
if [ ! -d "$ORIGEN" ]; then
    echo "Error: La carpeta d'origen '$ORIGEN' no existeix."
    exit 1
fi

# Demanar la carpeta de destí (amb valor per defecte)
read -p "Introdueix la carpeta de destí [Defecte: /home/joan/Documents/fotos_netes]: " DESTI
if [ -z "$DESTI" ]; then
    DESTI="/home/joan/Documents/fotos_netes"
fi

# Crear el directori destí si no existeix
mkdir -p "$DESTI"

# Extensions de foto que buscarem
EXTENSIONS=("jpg" "jpeg" "png" "heic" "JPG" "JPEG" "PNG" "HEIC")

echo "Iniciant el procés de fotos des de '$ORIGEN' cap a '$DESTI'..."

# Buscar tots els fitxers a dins de la carpeta d'origen
find "$ORIGEN" -type f | while read -r fitxer; do
    
    # Obtenir l'extensió del fitxer
    ext="${fitxer##*.}"
    
    # Comprovar si l'extensió és d'una foto acceptada
    imatge_valida=false
    for e in "${EXTENSIONS[@]}"; do
        if [ "$ext" = "$e" ]; then
            imatge_valida=true
            break
        fi
    done

    # Si no és una imatge (vídeo, document, etc.), la saltem
    if [ "$imatge_valida" = false ]; then
        continue
    fi

    # Obtenir la ruta del subdirectori i el nom del fitxer
    subdirectori=$(dirname "$fitxer")
    nom_fitxer=$(basename "$fitxer")
    
    # Crear l'estructura de subdirectories equivalent a la carpeta destí
    ruta_desti_directori="${subdirectori/$ORIGEN/$DESTI}"
    mkdir -p "$ruta_desti_directori"
    
    fitxer_desti="$ruta_desti_directori/$nom_fitxer"

    # Comprovacions de pes i origen (WhatsApp)
    mida_bytes=$(stat -c%s "$fitxer")
    mida_limit=524288 # 0.5 MB

    # Comprovar si és de WhatsApp
    es_whatsapp=false
    if [[ "$nom_fitxer" =~ -WA[0-9]+ ]]; then
        es_whatsapp=true
    fi

    # DECISIÓ PRINCIPAL: Copiar original o processar
    if [ "$mida_bytes" -lt "$mida_limit" ] || [ "$es_whatsapp" = true ]; then
        # Es copia l'original directament (sigui del format que sigui)
        cp "$fitxer" "$fitxer_desti"
        echo "Copiada original: $nom_fitxer"
    else
        # Si és gran, mirem si és HEIC o un format estàndard (JPG/PNG)
        if [ "$ext" = "heic" ] || [ "$ext" = "HEIC" ]; then
            # SCRIPT 2: Processament segur per a HEIC grans (Conversió a JPG + Compressió)
            fitxer_desti_jpg="${fitxer_desti%.*}.jpg"
            fitxer_temporal="/tmp/temp_${nom_fitxer%.*}.jpg"
            
            if heif-convert "$fitxer" "$fitxer_temporal" > /dev/null; then
                magick "$fitxer_temporal" -resize 2048x2048\> -quality 85 "$fitxer_desti_jpg"
                rm -f "$fitxer_temporal"
                echo "Comprimida i convertida (HEIC -> JPG): $nom_fitxer"
            else
                echo "Error crític: No s'ha pogut obrir o descodificar el fitxer HEIC: $nom_fitxer"
            fi
        else
            # SCRIPT 1: Processament normal amb ImageMagick per a JPG/PNG grans
            magick "$fitxer" -resize 2048x2048\> -quality 85 "$fitxer_desti"
            echo "Comprimida: $nom_fitxer"
        fi
    fi

done

echo "Procés finalitzat amb èxit! Les teves fotos estan ordenades a '$DESTI'."
